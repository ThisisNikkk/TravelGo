import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";

import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, StatusBar, FlatList, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../utils/dimension";
import { useDispatch } from "react-redux";

interface HomeProps {
    navigation: any;
}

const popularStays = [
    {
        id: '1',
        name: 'Alpine Chalet',
        price: 699,
        rating: 4.9,
        image: require('../../assets/swis.jpg'),
    },
    {
        id: '2',
        name: 'Lakeside Retreat',
        price: 726,
        rating: 4.8,
        image: require('../../assets/newz.jpg'),
    },
    {
        id: '3',
        name: 'Kyoto Sanctuary',
        price: 850,
        rating: 4.7,
        image: require('../../assets/japan.jpg'),
    },
    {
        id: '4',
        name: 'Great Wall View',
        price: 950,
        rating: 4.9,
        image: require('../../assets/china.jpg'),
    },
    {
        id: '5',
        name: 'Bali Villa',
        price: 600,
        rating: 4.7,
        image: require('../../assets/indo.jpg'),
    },
    // ... other stays
];


const Map: React.FC<HomeProps> = ({ navigation }) => {
    const { colors, images, text } = useTheme();
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const bg = require('../../assets/Map.png')
    const isSearchInputFilled = searchValue.length > 0;

    const renderStayCard = ({ item }: { item: typeof popularStays[0] }) => (
        <TouchableOpacity activeOpacity={0.9} style={styles.stayCard}>
            <Image source={item.image} style={styles.stayCardImage} />

            <View style={styles.stayCardDetails}>
                <View>
                    <Text style={[styles.stayCardTitle]}>
                        {item.name}
                    </Text>
                    <View style={styles.stayCardRatingContainer}>
                           <Image source={images.star} style={styles.stayCardStarIcon} />
                           <Image source={images.star} style={styles.stayCardStarIcon} />
                           <Image source={images.star} style={styles.stayCardStarIcon} />
                           <Image source={images.star} style={styles.stayCardStarIcon} />
                           <Image source={images.star} style={styles.stayCardStarIcon} />
                    </View>
                </View>

                <View>
                    <Text style={styles.stayCardPriceFrom}>from</Text>
                    <Text style={[styles.stayCardPrice]}>
                        {`$${item.price} / night`}
                    </Text>
                </View>
            </View>
            {/* <TouchableOpacity style={styles.likeButton}>
                <Image source={require('../../assets/Heart.png')} style={styles.likeIcon} />
            </TouchableOpacity> */}
        </TouchableOpacity>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.parent}>
                <StatusBar barStyle="dark-content" />
                <ImageBackground source={bg} style={{ flex: 1 }}>
                    <View style={styles.searchBarContainer}>
                        <TouchableOpacity style={styles.BackButton} onPress={() => navigation.goBack()}>
                            <Image
                                source={images.backMap}
                                style={styles.filterIcon}
                            />
                        </TouchableOpacity>
                        <View style={[
                            styles.searchInputWrapper,
                            { borderColor: isSearchInputFilled ? '#757575' : '#DBDBDB' }
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
                        <TouchableOpacity style={styles.filterButton}>
                            <Image
                                source={images.filter}
                                style={styles.filterIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.popularStayContainer}>
                        <Text style={[styles.popularTitle]}>Popular stays</Text>
                    </View>
                    
                    <View style={styles.flatListWrapper}>
                        <FlatList
                            data={popularStays}
                            renderItem={renderStayCard}
                            keyExtractor={(item) => item.id}
                            bounces={false}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.flatListContentContainer}
                        />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

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
        bottom: hp(28),
        paddingHorizontal: wp(5),
    },
    popularTitle: {
        fontSize: 24,
        fontFamily: 'NataSans-Bold',
        color: '#000',
    },
    flatListWrapper: {
        position: 'absolute',
        bottom: hp(3),
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
    },
    stayCardImage: {
        width: '40%',
        height: '90%',
        borderRadius:25,
        alignSelf:'center',
        left:10,
    },
    stayCardDetails: {
        flex: 1,
        paddingHorizontal: wp(5),
        paddingVertical: hp(2.5),
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
    likeButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    likeIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
});

export default Map;