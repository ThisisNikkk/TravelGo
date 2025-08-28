// screens/Plans.tsx

import React, { useState, useMemo } from 'react';
// --- Modal aur Image ko import mein add kiya gaya hai ---
import { View, StyleSheet, Text, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, Modal, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../../utils/dimension';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { getFirestore, doc, onSnapshot } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// --- travelData ko import kiya gaya hai taaki stay ki details mil sakein ---
import { travelData } from './Home'; // Dhyan rakhein ki ye path sahi ho

const db = getFirestore();

interface UserPlan {
    createdAt: {
        toDate: () => Date;
    };
    stayIds: string[];
    locationName?: string; 
}

const Plans: React.FC = () => {
    const { colors } = useTheme();
    const [savedPlans, setSavedPlans] = useState<UserPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState<UserPlan | null>(null);

    const allStaysMap = useMemo(() => {
        const map = new Map();
        travelData.forEach(location => {
            location.popularStays.forEach(stay => {
                map.set(stay.id, stay);
            });
        });
        return map;
    }, []);

    const detailedStaysForModal = useMemo(() => {
        if (!selectedPlanForModal) return [];
        return selectedPlanForModal.stayIds
            .map(id => allStaysMap.get(id))
            .filter(Boolean); 
    }, [selectedPlanForModal, allStaysMap]);

    useFocusEffect(
        React.useCallback(() => {
            const user = auth().currentUser;
            if (!user) {
                setError("Please log in to see your plans."); setLoading(false); setSavedPlans([]); return;
            }
            const uid = user.uid;
            const userPlanRef = doc(db, 'plans', uid);
            const subscriber = onSnapshot(userPlanRef, documentSnapshot => {
                if (documentSnapshot.exists()) {
                    const data = documentSnapshot.data();
                    const plans = data?.userPlans.sort((a: UserPlan, b: UserPlan) => 
                        b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
                    );
                    setSavedPlans(plans || []);
                } else {
                    setSavedPlans([]);
                }
                setLoading(false);
            }, err => {
                console.error("Error fetching plans: ", err);
                setError("Failed to load plans.");
                setLoading(false);
            });
            return () => subscriber();
        }, [])
    );

    const openDetailsModal = (plan: UserPlan) => {
        setSelectedPlanForModal(plan);
        setDetailsModalVisible(true);
    };

    const closeDetailsModal = () => {
        setDetailsModalVisible(false);
        setSelectedPlanForModal(null);
    };

    const renderPlanCard = ({ item }: { item: UserPlan }) => {
        const planTitle = item.locationName ? `${item.locationName}'s Plan` : 'Trip Plan';
        
        return (
            <TouchableOpacity style={styles.planCard} onPress={() => openDetailsModal(item)}>
                <View>
                    <Text style={styles.planCardTitle}>{planTitle}</Text>
                    <Text style={styles.planCardDate}>
                        Created on: {item.createdAt.toDate().toLocaleDateString()}
                    </Text>
                </View>
                <View style={styles.staysBadge}>
                    <Text style={styles.staysBadgeText}>{item.stayIds.length}</Text>
                    <Text style={styles.staysLabelText}>Stays</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderStayDetailCard = ({ item, index }: { item: any, index: number }) => (
        <View style={styles.stayDetailCard}>
            <Image source={item.image} style={styles.stayDetailImage} />
            <View style={styles.stayDetailInfo}>
                <Text style={styles.stayDetailName}>{item.name}</Text>
            </View>
            <View style={styles.stayDetailPriority}>
                <Text style={styles.stayDetailPriorityText}>{index + 1}</Text>
            </View>
        </View>
    );

    const renderContent = () => {
        if (loading) { return <ActivityIndicator size="large" color="#007AFF" style={styles.centered} />; }
        if (error) { return <Text style={styles.emptyText}>{error}</Text>; }
        if (savedPlans.length === 0) { return <Text style={[styles.emptyText,{color:colors.text,opacity:0.7}]}>You have no saved plans yet.</Text>; }
        return (
            <FlatList
                data={savedPlans}
                bounces={false}
                renderItem={renderPlanCard}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={styles.flatListContent}
            />
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.parent, { backgroundColor: colors.background }]}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>My Saved Plans</Text>
                </View>
                <View style={styles.contentContainer}>
                    {renderContent()}
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isDetailsModalVisible}
                    onRequestClose={closeDetailsModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>
                                {selectedPlanForModal?.locationName ? `${selectedPlanForModal.locationName}'s Plan Details` : 'Plan Details'}
                            </Text>
                            <FlatList
                                data={detailedStaysForModal}
                                renderItem={renderStayDetailCard}
                                keyExtractor={(item) => item.id}
                                style={{ width: '100%' }}
                                contentContainerStyle={{ gap: hp(1.5) }}
                                showsVerticalScrollIndicator={false}
                            />
                            <TouchableOpacity style={styles.closeButton} onPress={closeDetailsModal}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    header: {
        paddingHorizontal: wp(5),
        paddingVertical: hp(3.2),
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: 'NataSans-Bold',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        color: '#888',
    },
    flatListContent: {
        padding: wp(5),
        gap: hp(2),
    },
    planCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: wp(5),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    planCardTitle: {
        fontSize: 20,
        fontFamily: 'NataSans-SemiBold',
        color: '#000',
    },
    planCardDate: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#666',
        marginTop: 4,
    },
    staysBadge: {
        backgroundColor: '#EBF5FF',
        borderRadius: 10,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        alignItems: 'center',
    },
    staysBadgeText: {
        fontSize: 22,
        fontFamily: 'NataSans-Bold',
        color: '#007AFF',
    },
    staysLabelText: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#007AFF',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: wp(90),
        maxHeight: hp(70),
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: 'NataSans-Bold',
        marginBottom: 20,
        color: '#000',
    },
    closeButton: {
        width: '100%',
        paddingVertical: 15,
        marginTop: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
    },
    closeButtonText:{
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#007AFF',
    },

    stayDetailCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 25,
        padding: wp(3),
        width: '100%',
    },
    stayDetailImage: {
        width: wp(20),
        height: wp(20),
        borderRadius: 10,
    },
    stayDetailInfo: {
        flex: 1,
        marginLeft: wp(5),
    },
    stayDetailName: {
        fontSize: 16,
        fontFamily: 'NataSans-SemiBold',
        color: '#333',
    },
    stayDetailLocation: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#777',
    },
    stayDetailPriority: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:wp(2),
    },
    stayDetailPriorityText: {
        color: 'white',
        fontFamily: 'NataSans-Bold',
        fontSize: 14,
    },
});

export default Plans;