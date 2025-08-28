// screens/Wallet.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../../utils/dimension';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { getFirestore, doc, onSnapshot } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const db = getFirestore();

interface UserPlan {
    createdAt: {
        toDate: () => Date;
    };
    stayIds: string[];
    locationName?: string; // It's optional for any old plans you have saved
}

const Plans: React.FC = () => {
    const { colors } = useTheme();
    const [savedPlans, setSavedPlans] = useState<UserPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            const user = auth().currentUser;

            if (!user) {
                setError("Please log in to see your plans.");
                setLoading(false);
                setSavedPlans([]);
                return;
            }

            const uid = user.uid;
            
            const userPlanRef = doc(db, 'plans', uid);

            const subscriber = onSnapshot(userPlanRef, documentSnapshot => {
                if (documentSnapshot.exists()) {
                    const data = documentSnapshot.data();
                    // Sort plans by creation date, newest first
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

            // Unsubscribe from the listener when the screen is unfocused
            return () => subscriber();
        }, [])
    );

    const renderPlanCard = ({ item }: { item: UserPlan }) => {
        // Create the title based on whether locationName exists
        const planTitle = item.locationName ? `${item.locationName}'s Plan` : 'Trip Plan';
        
        return (
            <TouchableOpacity style={styles.planCard}>
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

    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#007AFF" style={styles.centered} />;
        }

        if (error) {
            return <Text style={styles.emptyText}>{error}</Text>;
        }

        if (savedPlans.length === 0) {
            return <Text style={styles.emptyText}>You have no saved plans yet.</Text>;
        }

        return (
            <FlatList
                data={savedPlans}
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
    }
});

export default Plans;