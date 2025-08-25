import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";

import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, StatusBar, FlatList, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../utils/dimension";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/Reducers/userData";

interface HomeProps {
  navigation: any;
}

const popularLocations = [
  {
    id: '1',
    name: 'Switzerland',
    price: 699,
    rating: 4.9,
    image: require('../../assets/swis.jpg'),
  },
  {
    id: '2',
    name: 'New Zealand',
    price: 726,
    rating: 4.8,
    image: require('../../assets/newz.jpg'),
  },
  {
    id: '3',
    name: 'Japan',
    price: 850,
    rating: 4.7,
    image: require('../../assets/japan.jpg'),
  },
  {
    id: '4',
    name: 'China',
    price: 950,
    rating: 4.9,
    image: require('../../assets/china.jpg'),
  },
  {
    id: '5',
    name: 'Indonesia',
    price: 600,
    rating: 4.7,
    image: require('../../assets/indo.jpg'),
  },
  {
    id: '7',
    name: 'Singapore',
    price: 1050,
    rating: 4.9,
    image: require('../../assets/singa.jpg'),
  },
  {
    id: '8',
    name: 'Bhutan',
    price: 550,
    rating: 4.8,
    image: require('../../assets/bhutan.webp'),
  },
  {
    id: '9',
    name: 'India',
    price: 750,
    rating: 5.0,
    image: require('../../assets/india.jpg'),
  },
  {
    id: '10',
    name: 'Dubai',
    price: 850,
    rating: 4.8,
    image: require('../../assets/dubai.jpg'),
  },
  {
    id: '11',
    name: 'Brazil',
    price: 600,
    rating: 4.4,
    image: require('../../assets/brazil.jpg'),
  },
  {
    id: '12',
    name: 'Spain',
    price: 800,
    rating: 4.8,
    image: require('../../assets/spain.webp'),
  },
  {
    id: '13',
    name: 'Greece',
    price: 700,
    rating: 4.9,
    image: require('../../assets/greece.jpg'),
  },
  {
    id: '14',
    name: 'Germany',
    price: 590,
    rating: 4.5,
    image: require('../../assets/germany.jpg'),
  },
  {
    id: '15',
    name: 'Austria',
    price: 400,
    rating: 4.4,
    image: require('../../assets/austria.webp'),
  },
];
const popularStays = [
  {
    id: '1',
    name: 'Switzerland',
    price: 699,
    rating: 4.9,
    image: require('../../assets/swis.jpg'),
  },
  {
    id: '2',
    name: 'New Zealand',
    price: 726,
    rating: 4.8,
    image: require('../../assets/newz.jpg'),
  },
  {
    id: '3',
    name: 'Japan',
    price: 850,
    rating: 4.7,
    image: require('../../assets/japan.jpg'),
  },
  {
    id: '4',
    name: 'China',
    price: 950,
    rating: 4.9,
    image: require('../../assets/china.jpg'),
  },
  {
    id: '5',
    name: 'Indonesia',
    price: 600,
    rating: 4.7,
    image: require('../../assets/indo.jpg'),
  },
  {
    id: '7',
    name: 'Singapore',
    price: 1050,
    rating: 4.9,
    image: require('../../assets/singa.jpg'),
  },
  {
    id: '8',
    name: 'Bhutan',
    price: 550,
    rating: 4.8,
    image: require('../../assets/bhutan.webp'),
  },
  {
    id: '9',
    name: 'India',
    price: 750,
    rating: 5.0,
    image: require('../../assets/india.jpg'),
  },
  {
    id: '10',
    name: 'Dubai',
    price: 850,
    rating: 4.8,
    image: require('../../assets/dubai.jpg'),
  },
  {
    id: '11',
    name: 'Brazil',
    price: 600,
    rating: 4.4,
    image: require('../../assets/brazil.jpg'),
  },
  {
    id: '12',
    name: 'Spain',
    price: 800,
    rating: 4.8,
    image: require('../../assets/spain.webp'),
  },
  {
    id: '13',
    name: 'Greece',
    price: 700,
    rating: 4.9,
    image: require('../../assets/greece.jpg'),
  },
  {
    id: '14',
    name: 'Germany',
    price: 590,
    rating: 4.5,
    image: require('../../assets/germany.jpg'),
  },
  {
    id: '15',
    name: 'Austria',
    price: 400,
    rating: 4.4,
    image: require('../../assets/austria.webp'),
  },
];


const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { colors, images, text } = useTheme();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const isSearchInputFilled = searchValue.length > 0;

   const renderLocationCard = ({ item }: { item: typeof popularLocations[0] }) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('LocationDetails', { locationData: item })}
    >
      <ImageBackground
        source={item.image}
        style={styles.locationCard}
        imageStyle={styles.locationImageStyle}
      >
        <View style={styles.cardOverlay}>
          <View>
            <Text style={[styles.locationName,{color:text.imgText}]}>{item.name}</Text>
            <Text style={[styles.locationPrice,{color:text.imgText}]}>{`from $${item.price}`}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingText,{color:text.imgText}]}>{item.rating}</Text>
            <Image source={images.star} style={styles.starIcon} />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  const renderStayCard = ({ item }: { item: typeof popularLocations[0] }) => (
    <TouchableOpacity activeOpacity={0.8}>
      <ImageBackground
        source={item.image}
        style={styles.StayCard}
        imageStyle={styles.locationImageStyle}
      >
        <View style={styles.cardOverlay}>
          <View>
            <Text style={[styles.locationName,{color:text.imgText}]}>{item.name}</Text>
            <Text style={[styles.locationPrice,{color:text.imgText}]}>{`from $${item.price}`}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingText,{color:text.imgText}]}>{item.rating}</Text>
            <Image source={images.star} style={styles.starIcon} />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.parent}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Text style={[styles.subText, { color: colors.text }]}>Find your next trip</Text>
          <Text style={[styles.titleText, { color: colors.text }]} onPress={()=> dispatch(setAuth(false))} >Select Your Destination</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <View style={[
            styles.searchInputWrapper,
            { borderColor: isSearchInputFilled ? '#757575' : '#DBDBDB' }
          ]}>
            <Image
              source={images.search}
              style={[styles.searchIcon, { tintColor: colors.text }]}
            />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Search..."
              placeholderTextColor={colors.text}
              value={searchValue}
              onChangeText={setSearchValue}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Image
              source={images.filter}
              style={styles.filterIcon}
              onError={(e) => console.log('Error loading filter image:', e.nativeEvent.error)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.popularSectionContainer}>
          <Text style={[styles.popularTitle, { color: colors.text }]}>Popular locations</Text>
        </View>
        <FlatList
          data={popularLocations}
          renderItem={renderLocationCard}
          keyExtractor={(item) => item.id}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.flatListContentContainer,{paddingBottom:20}]}
        />
        <View style={styles.popularStayContainer}>
          <Text style={[styles.popularTitle, { color: colors.text }]}>Popular stays</Text>
        </View>
        <FlatList
          data={popularStays}
          renderItem={renderStayCard}
          keyExtractor={(item) => item.id}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.flatListContentContainer,{ paddingBottom: hp(8) }]}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    opacity: 0.6,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'NataSans-SemiBold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    gap: wp(6),
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    height: 55,
    paddingHorizontal: wp(4),
    borderWidth: 1.5,
  },
  searchIcon: {
    width: 22,
    height: 22,
    marginRight: wp(3),
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    padding: 0,
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
  filterIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  popularSectionContainer: {
    paddingHorizontal: wp(5),
  },
  popularStayContainer: {
    paddingHorizontal: wp(5),
  },
  popularTitle: {
    fontSize: 20,
    fontFamily: 'NataSans-SemiBold',
  },
  flatListContentContainer: {
    paddingLeft: wp(5),
    paddingTop: hp(2),
    gap:wp(4),
  },
  locationCard: {
    width: wp(65),
    height: hp(20),
    justifyContent: 'flex-end',
    padding: wp(4),
    overflow: 'hidden',
  },
  StayCard: {
    width: wp(50),
    height: hp(30),
    justifyContent: 'flex-end',
    padding: wp(4),
    overflow: 'hidden',
  },
  locationImageStyle: {
    borderRadius: 25,
  },
  cardOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  locationName: {
    fontSize: 20,
    fontFamily: 'NataSans-SemiBold',

  },
  locationPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    opacity: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginRight:wp(1),
  },
  starIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFC700',
    resizeMode:'cover',
  },
});

export default Home;