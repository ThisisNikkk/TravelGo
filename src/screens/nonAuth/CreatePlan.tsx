// screens/Plan.tsx

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { travelData } from '../nonAuth/Home'; 
import { hp, wp } from '../../utils/dimension'; 
import { useTheme } from '@react-navigation/native';
import { getFirestore, doc, setDoc, arrayUnion } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Initialize Firestore
const db = getFirestore();

interface PlanProps {
    navigation: any;
    route: any;
}

const CreatePlan: React.FC<PlanProps> = ({ navigation, route }) => {
    const { colors, images, text } = useTheme();
    const [priorityOrder, setPriorityOrder] = useState<string[]>([]);
    const [isCreatingPlan, setIsCreatingPlan] = useState(false);
    
    // Receive locationName from route params
    const { selectedIds, locationName } = route.params;

    const selectedStays = useMemo(() => {
        let stays: any[] = [];
        for (const location of travelData) {
            const foundStays = location.popularStays.filter(stay => selectedIds.includes(stay.id));
            if (foundStays.length > 0) {
                stays.push(...foundStays);
            }
        }
        return stays;
    }, [selectedIds]);

    const handlePrioritySelect = (stayId: string) => {
        setPriorityOrder(prevOrder => {
            if (prevOrder.includes(stayId)) {
                return prevOrder.filter(id => id !== stayId);
            } else {
                return [...prevOrder, stayId];
            }
        });
    };
    
    const handleConfirmPlan = async () => {
        const user = auth().currentUser;

        if (!user) {
            Alert.alert("Not Logged In", "You must be logged in to create a plan.");
            return;
        }
        
        setIsCreatingPlan(true);

        const uid = user.uid;
        
        // Add locationName to the plan object we save
        const newPlan = {
            createdAt: new Date(), 
            stayIds: priorityOrder,
            locationName: locationName || 'Trip' // Use the locationName, with a fallback
        };

        try {
            const userPlanRef = doc(db, 'plans', uid);
            
            await setDoc(userPlanRef, {
                userPlans: arrayUnion(newPlan)
            }, { merge: true });

            Alert.alert("Success!", "Your plan has been saved.");

            // Ensure 'Tabs' is the correct name for your Tab Navigator
            navigation.navigate('Tabs', { screen: 'Plans' });

        } catch (error) {
            console.error("Error saving plan: ", error);
            Alert.alert("Error", "Could not save your plan. Please try again.");
        } finally {
            setIsCreatingPlan(false);
        }
    };

    const renderPlanItem = ({ item }: any) => {
        const priorityIndex = priorityOrder.indexOf(item.id);
        const isSelected = priorityIndex !== -1;
        const priorityNumber = priorityIndex + 1;

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.planCard, isSelected && styles.selectedPlanCard]}
                onPress={() => handlePrioritySelect(item.id)}
            >
                <Image source={item.image} style={styles.planCardImage} />
                <View style={styles.planCardDetails}>
                    <Text style={styles.planCardTitle}>{item.name}</Text>
                    <Text style={styles.planCardPrice}>{`$${item.price} / night`}</Text>
                </View>
                {isSelected && (
                    <View style={styles.priorityBadge}>
                        <Text style={styles.priorityText}>{priorityNumber}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.parent, { backgroundColor: colors.background }]}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Plan Your Visit</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.text, opacity: 0.7 }]}>Select stays in the order you want to visit them.</Text>
                </View>
                <FlatList
                    bounces={false}
                    data={selectedStays}
                    renderItem={renderPlanItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContent}
                />
                {priorityOrder.length > 0 && priorityOrder.length === selectedStays.length && (
                    <TouchableOpacity 
                        style={styles.confirmButton} 
                        onPress={handleConfirmPlan}
                        disabled={isCreatingPlan}
                    >
                        {isCreatingPlan ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.confirmButtonText}>Create Plan</Text>
                        )}
                    </TouchableOpacity>
                )}
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
    headerSubtitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        marginTop: 4,
    },
    flatListContent: {
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
        gap: hp(2),
        paddingBottom: hp(15), 
    },
    planCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: wp(3),
        elevation: 3,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedPlanCard: {
        borderColor: '#007AFF',
    },
    planCardImage: {
        width: wp(40),
        height: wp(40),
        borderRadius: 15,
    },
    planCardDetails: {
        flex: 1,
        marginLeft: wp(4),
        justifyContent: 'center',
    },
    planCardTitle: {
        fontSize: 20,
        fontFamily: 'NataSans-SemiBold',
        color: '#000',
    },
    planCardPrice: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#555',
        marginTop: hp(1),
    },
    priorityBadge: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    priorityText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'NataSans-Bold',
    },
    confirmButton: {
        position: 'absolute',
        bottom: hp(4),
        left: wp(5),
        right: wp(5),
        backgroundColor: '#007AFF',
        paddingVertical: hp(2),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'NataSans-SemiBold',
    },
});

export default CreatePlan;