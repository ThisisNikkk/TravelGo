// screens/Map.tsx

import { useTheme } from "@react-navigation/native";
import React, { useState, useMemo } from "react";
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, StatusBar, FlatList, ImageBackground, Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../utils/dimension";
import { useDispatch } from "react-redux";
import { travelData } from "../nonAuth/Home";

interface MapProps {
    navigation: any;
    route: any;
}

const Map: React.FC<MapProps> = ({ navigation, route }) => {
    const { colors, images, text } = useTheme();
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const bg = require('../../assets/Map.png');

    const [selectedStayIds, setSelectedStayIds] = useState<string[]>([]);
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const { locationId } = route.params;

    const selectedLocation = travelData.find(location => location.id === locationId);
    const staysToShow = selectedLocation ? selectedLocation.popularStays : [];

    const filteredStays = useMemo(() => {
        let result = staysToShow;

        if (searchValue) {
            result = result.filter(stay =>
                stay.name.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        if (activeFilter !== 'all') {
            const lowerBound = parseInt(activeFilter, 10);
            const upperBound = lowerBound + 1;

            if (lowerBound === 5) {
                result = result.filter(stay => stay.rating >= lowerBound);
            } else {
                result = result.filter(stay => stay.rating >= lowerBound && stay.rating < upperBound);
            }
        }

        return result;
    }, [searchValue, staysToShow, activeFilter]);


    const handleSelectStay = (stayId: string) => {
        setSelectedStayIds(prevSelectedIds => {
            if (prevSelectedIds.includes(stayId)) {
                return prevSelectedIds.filter(id => id !== stayId);
            } else {
                return [...prevSelectedIds, stayId];
            }
        });
    };

    const handleApplyFilter = (rating: string) => {
        setActiveFilter(rating);
        setFilterModalVisible(false);
    }
    
    const handleContinue = () => {
        console.log("Navigating to Plan with selected stays:", selectedStayIds);
        navigation.replace('CreatePlan', { 
            selectedIds: selectedStayIds,
            locationName: selectedLocation?.name 
        });
    };

    const renderStayCard = ({ item }: any) => {
        const isSelected = selectedStayIds.includes(item.id);

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.stayCard, isSelected && styles.selectedStayCard]}
                onPress={() => handleSelectStay(item.id)}
            >
                <Image source={item.image} style={styles.stayCardImage} />
                <View style={styles.stayCardDetails}>
                    <View>
                        <Text style={[styles.stayCardTitle]}>
                            {item.name}
                        </Text>
                        <View style={styles.stayCardRatingContainer}>
                            {Array.from({ length: Math.floor(item.rating || 0) }).map((_, index) => (
                                <Image key={index} source={images.star} style={styles.stayCardStarIcon} />
                            ))}
                        </View>
                    </View>

                    <View>
                        <Text style={styles.stayCardPriceFrom}>from</Text>
                        <Text style={[styles.stayCardPrice]}>
                            {`$${item.price} / night`}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.parent}>
                <StatusBar barStyle="dark-content" />
                <ImageBackground source={bg} style={{ flex: 1 }}>
                    {/* ... Ommited the rest of the JSX for brevity, no changes there ... */}
                    <View style={styles.searchBarContainer}>
                        <TouchableOpacity style={styles.BackButton} onPress={() => navigation.goBack()}>
                            <Image
                                source={images.backMap}
                                style={styles.filterIcon}
                            />
                        </TouchableOpacity>
                        <View style={[
                            styles.searchInputWrapper,
                            { borderColor: searchValue.length > 0 ? '#757575' : '#DBDBDB' }
                        ]}>
                            <Image
                                source={images.search}
                                style={[styles.searchIcon]}
                            />
                            <TextInput
                                style={[styles.input]}
                                placeholder="Search..."
                                placeholderTextColor='#000'
                                value={searchValue}
                                onChangeText={setSearchValue}
                                autoCapitalize="none"
                            />
                        </View>
                        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
                            <Image
                                source={images.filter}
                                style={styles.filterIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.popularStayContainer}>
                        <Text style={[styles.popularTitle]}>{selectedLocation?.name || 'Popular'} Stays</Text>
                    </View>

                    <View style={styles.flatListWrapper}>
                        <FlatList
                            data={filteredStays}
                            renderItem={renderStayCard}
                            keyExtractor={(item) => item.id}
                            bounces={false}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.flatListContentContainer}
                        />
                    </View>

                    {selectedStayIds.length > 0 && (
                        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    )}

                </ImageBackground>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isFilterModalVisible}
                    onRequestClose={() => setFilterModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Filter by Rating</Text>
                            <TouchableOpacity style={styles.filterOptionButton} onPress={() => handleApplyFilter('all')}>
                                <Text style={styles.filterOptionText}>All Stays</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterOptionButton} onPress={() => handleApplyFilter('5')}>
                                <Text style={styles.filterOptionText}>5 Stars ★★★★★</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterOptionButton} onPress={() => handleApplyFilter('4')}>
                                <Text style={styles.filterOptionText}>4 Stars ★★★★</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.filterOptionButton} onPress={() => handleApplyFilter('3')}>
                                <Text style={styles.filterOptionText}>3 Stars ★★★</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setFilterModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

// Styles are exactly the same as before
const styles = StyleSheet.create({
    parent: {
        flex: 1,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(8),
        paddingHorizontal: wp(2.8),
        gap: wp(5),
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        height: 55,
        paddingHorizontal: wp(4),
        backgroundColor: '#fff',
        elevation: 5,
        borderWidth: 1,
    },
    searchIcon: {
        width: 19,
        height: 19,
        marginRight: wp(3),
        alignSelf: 'center',
    },
    input: {
        flex: 1,
        height: '100%',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        padding: 0,
        color: '#000',
    },
    filterButton: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    BackButton: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    filterIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    popularStayContainer: {
        position: 'absolute',
        bottom: hp(36),
        paddingHorizontal: wp(5),
    },
    popularTitle: {
        fontSize: 24,
        fontFamily: 'NataSans-Bold',
        color: '#000',
    },
    flatListWrapper: {
        position: 'absolute',
        bottom: hp(12),
        left: 0,
        right: 0,
        height: hp(22),
    },
    flatListContentContainer: {
        paddingHorizontal: wp(5),
        gap: wp(4),
    },
    stayCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 25,
        width: wp(80),
        height: hp(20),
        elevation: 5,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedStayCard: {
        borderColor: '#007AFF',
    },
    stayCardImage: {
        width: '40%',
        height: '90%',
        borderRadius: 25,
        alignSelf: 'center',
        left: 10,
    },
    stayCardDetails: {
        flex: 1,
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),
        justifyContent: 'space-between',
    },
    stayCardTitle: {
        fontSize: 22,
        fontFamily: 'NataSans-SemiBold',
        color: '#000',
    },
    stayCardRatingContainer: {
        flexDirection: 'row',
        marginTop: hp(1),
    },
    stayCardStarIcon: {
        width: 18,
        height: 18,
        marginRight: 3,
        tintColor: '#FFC700',
    },
    stayCardPriceFrom: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#9E9E9E',
    },
    stayCardPrice: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#000',
    },
    continueButton: {
        position: 'absolute',
        bottom: hp(4),
        left: wp(5),
        right: wp(5),
        backgroundColor: '#007AFF',
        paddingVertical: hp(2),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'NataSans-SemiBold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 30,
        width: wp(90),
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'NataSans-Bold',
        marginBottom: 10,
        color: '#000',
    },
    filterOptionButton: {
        width: '100%',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    filterOptionText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        color: '#007AFF',
    },
    closeButton: {
        width: '100%',
        paddingVertical: 15,
    },
    closeButtonText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#FF3B30',
    }
});


export default Map;