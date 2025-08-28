import { useTheme } from "@react-navigation/native";
import React, { useState, useMemo, useCallback } from "react";
// --- Added Modal to imports ---
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, StatusBar, FlatList, Modal } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../utils/dimension";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/Reducers/userData";
import AppRoutes from "../../routes/RouteKeys/appRoutes";
import FastImage from '@d11/react-native-fast-image';


// Data ko component ke bahar define kiya gaya hai
export const travelData = [
  // ... (Your travelData remains unchanged)
  {
    id: '1',
    name: 'Switzerland',
    price: 752,
    rating: 4.7,
    image: require('../../assets/swis.jpg'),
    description: 'Home to majestic Alps, pristine lakes, and charming villages. A paradise for nature lovers and adventurers.',
    popularStays: [
      { id: 'swis-1', name: 'Lucerne', location: 'Lucerne', price: 810, rating: 4.8, image: require('../../assets/lucerne.jpg') },
      { id: 'swis-2', name: 'Zurich', location: 'Zurich', price: 950, rating: 4.6, image: require('../../assets/zurich.jpg') },
      { id: 'swis-3', name: 'Zermatt', location: 'Zermatt', price: 780, rating: 5.0, image: require('../../assets/zermatt.jpg') },
      { id: 'swis-4', name: 'Jungfraujoch', location: 'Jungfraujoch', price: 1100, rating: 4.9, image: require('../../assets/jung.jpg') },
      { id: 'swis-5', name: 'Geneva', location: 'Geneva', price: 720, rating: 4.7, image: require('../../assets/geneva.jpg') },
    ]
  },
  {
    id: '2',
    name: 'New Zealand',
    price: 815,
    rating: 4.9,
    image: require('../../assets/newz.jpg'),
    description: 'Experience breathtaking landscapes, from dramatic fjords to lush rainforests. The ultimate destination for thrill-seekers.',
    popularStays: [
      { id: 'nz-1', name: 'Auckland', location: 'Auckland', price: 750, rating: 4.7, image: require('../../assets/auckland.jpg') },
      { id: 'nz-2', name: 'Bay of Islands', location: 'Bay of Islands', price: 920, rating: 4.8, image: require('../../assets/bay.jpg') },
      { id: 'nz-3', name: 'Queenstown ', location: 'Queenstown ', price: 950, rating: 4.9, image: require('../../assets/queenstown.jpg') },
      { id: 'nz-4', name: 'Christchurch', location: 'Christchurch', price: 880, rating: 4.6, image: require('../../assets/christ.jpg') },
    ]
  },
  {
    id: '3',
    name: 'Japan',
    price: 920,
    rating: 4.8,
    image: require('../../assets/japan.jpg'),
    description: 'A seamless blend of ancient tradition and futuristic technology. Witness serene temples, bustling cities, and iconic cherry blossoms.',
    popularStays: [
      { id: 'jp-1', name: 'Tokyo', location: 'Tokyo', price: 1100, rating: 4.9, image: require('../../assets/tokyo.jpg') },
      { id: 'jp-2', name: 'Kyoto', location: 'Kyoto', price: 1300, rating: 5.0, image: require('../../assets/kyoto.jpg') },
      { id: 'jp-3', name: 'Osaka', location: 'Osaka', price: 850, rating: 4.6, image: require('../../assets/okasa.jpg') },
      { id: 'jp-4', name: 'Nara ', location: 'Nara ', price: 820, rating: 4.7, image: require('../../assets/nara.jpg') },
      { id: 'jp-5', name: 'Mount Fuji', location: 'Mount Fuji', price: 1050, rating: 4.8, image: require('../../assets/fuji.webp') },
    ]
  },
  {
    id: '4',
    name: 'China',
    price: 980,
    rating: 4.6,
    image: require('../../assets/china.jpg'),
    description: 'Explore a land of ancient wonders, from the Great Wall to the Forbidden City. Discover rich history and vibrant modern culture.',
    popularStays: [
      { id: 'ch-1', name: 'The Great Wall Of China', location: 'The Great Wall Of China', price: 1050, rating: 4.9, image: require('../../assets/china.jpg') },
      { id: 'ch-2', name: 'The Potala Palace', location: 'The Potala Palace', price: 950, rating: 4.7, image: require('../../assets/palace.webp') },
      { id: 'ch-3', name: 'Beijing', location: 'Beijing', price: 1100, rating: 4.8, image: require('../../assets/beijing.jpg') },
      { id: 'ch-4', name: 'Shanghai', location: 'Shanghai', price: 1150, rating: 4.9, image: require('../../assets/shanghai.jpg') },
      { id: 'ch-5', name: 'Hong Kong', location: 'Hong Kong', price: 1200, rating: 4.8, image: require('../../assets/hong.jpg') },
      { id: 'ch-6', name: 'Jiuzhaigou Valley', location: 'Jiuzhaigou Valley', price: 980, rating: 4.9, image: require('../../assets/valley.jpg') },
      { id: 'ch-7', name: 'The Old Town of Lijiang', location: 'The Old Town of Lijiang', price: 900, rating: 4.7, image: require('../../assets/village.jpg') },
      { id: 'ch-8', name: 'Forbidden City', location: 'Forbidden City', price: 1020, rating: 4.9, image: require('../../assets/city.webp') },


    ]
  },
  {
    id: '5',
    name: 'Indonesia',
    price: 650,
    rating: 4.8,
    image: require('../../assets/indo.jpg'),
    description: 'An archipelago of stunning beauty, offering idyllic beaches, lush jungles, and vibrant cultural experiences in places like Bali.',
    popularStays: [
      { id: 'indo-1', name: 'Bali ', location: 'Bali ', price: 750, rating: 4.9, image: require('../../assets/bali.jpg') },
      { id: 'indo-2', name: 'Ubud', location: 'Ubud', price: 720, rating: 4.8, image: require('../../assets/ubud.jpg') },
      { id: 'indo-3', name: 'Uluwatu', location: 'Uluwatu', price: 1400, rating: 4.9, image: require('../../assets/ulu.webp') },
      { id: 'indo-4', name: 'Nusa Islands', location: 'Nusa Islands', price: 1450, rating: 5.0, image: require('../../assets/nusa.jpeg') },
      { id: 'indo-5', name: 'Seminyak', location: 'Seminyak', price: 1350, rating: 4.8, image: require('../../assets/seminyak.jpg') },
      { id: 'indo-6', name: 'Yogyakarta ', location: 'Yogyakarta ', price: 1280, rating: 4.7, image: require('../../assets/yogya.jpg') },
    ]
  },
  {
    id: '7',
    name: 'Singapore',
    price: 1100,
    rating: 4.8,
    image: require('../../assets/singa.jpg'),
    description: 'Discover a futuristic city-state where lush nature meets cutting-edge architecture. A global hub for dining and shopping.',
    popularStays: [
      { id: 'sg-1', name: 'Marina Bay Sands', location: 'Marina Bay Sands', price: 1300, rating: 4.9, image: require('../../assets/marina.jpg') },
      { id: 'sg-2', name: 'The Merlion', location: 'The Merlion', price: 1150, rating: 4.7, image: require('../../assets/merlion.jpg') },
      { id: 'sg-3', name: 'Chinatown', location: 'Chinatown', price: 1050, rating: 4.6, image: require('../../assets/chinatown.webp') },
      { id: 'sg-4', name: 'Little India', location: 'Little India', price: 1080, rating: 4.5, image: require('../../assets/little.jpg') },
      { id: 'sg-5', name: 'Sentosa Island', location: 'Sentosa Island', price: 1250, rating: 4.8, image: require('../../assets/sentosa.jpg') },
    ]
  },
  {
    id: '8',
    name: 'Bhutan',
    price: 580,
    rating: 4.9,
    image: require('../../assets/bhutan.webp'),
    description: 'Journey to the serene Himalayan kingdom known for its stunning monasteries and the unique philosophy of Gross National Happiness.',
    popularStays: [
      { id: 'bhu-1', name: 'Dzongs', location: 'Dzongs', price: 620, rating: 4.8, image: require('../../assets/dzong.jpg') },
      { id: 'bhu-2', name: 'Paro Taktsang', location: 'Paro Taktsang', price: 650, rating: 5.0, image: require('../../assets/bhutan.webp') },
      { id: 'bhu-3', name: 'Thimphu', location: 'Thimphu', price: 610, rating: 4.7, image: require('../../assets/thimpu.jpg') },
      { id: 'bhu-4', name: 'Dochula Pass', location: 'Dochula Pass', price: 590, rating: 4.9, image: require('../../assets/dolchu.jpg') },
    ]
  },
  {
    id: '9',
    name: 'India',
    price: 780,
    rating: 4.9,
    image: require('../../assets/india.jpg'),
    description: 'A vibrant tapestry of cultures, colors, and landscapes. From the iconic Taj Mahal to serene backwaters, India offers an unforgettable journey.',
    popularStays: [
      { id: 'in-1', name: 'Agra', location: 'Agra', price: 880, rating: 5.0, image: require('../../assets/india.jpg') },
      { id: 'in-2', name: 'Jaipur', location: 'Jaipur', price: 860, rating: 4.8, image: require('../../assets/jaipur.jpg') },
      { id: 'in-3', name: 'Delhi', location: 'Delhi', price: 900, rating: 4.7, image: require('../../assets/delhi.webp') },
      { id: 'in-4', name: 'Varanasi', location: 'Varanasi', price: 840, rating: 4.9, image: require('../../assets/var.jpg') },
      { id: 'in-5', name: 'Amritsar', location: 'Amritsar', price: 850, rating: 4.9, image: require('../../assets/amritsar.jpg') },
      { id: 'in-6', name: 'Rishikesh ', location: 'Rishikesh ', price: 830, rating: 4.8, image: require('../../assets/rishi.jpg') },
      { id: 'in-7', name: 'Goa', location: 'Goa', price: 950, rating: 4.7, image: require('../../assets/goa.webp') },
      { id: 'in-8', name: 'Kerala', location: 'Kerala', price: 870, rating: 5.0, image: require('../../assets/kerala.webp') },
      { id: 'in-9', name: 'Andaman & Nicobar', location: 'Andaman and Nicobar Islands', price: 980, rating: 4.9, image: require('../../assets/ann.jpg') },
      { id: 'in-10', name: 'Jammu and Kashmir', location: 'Jammu and Kashmir', price: 1000, rating: 5.0, image: require('../../assets/kashmir.jpg') },
      { id: 'in-11', name: 'Shimla', location: 'Shimla', price: 820, rating: 4.6, image: require('../../assets/shim.jpg') },

    ]
  },
  {
    id: '10',
    name: 'Dubai',
    price: 900,
    rating: 4.7,
    image: require('../../assets/dubai.jpg'),
    description: 'A dazzling metropolis in the desert. Experience ultimate luxury, iconic skyscrapers, and thrilling desert adventures.',
    popularStays: [
      { id: 'db-1', name: 'Burj Al Arab', location: 'Jumeirah', price: 1600, rating: 5.0, image: require('../../assets/arab.jpg') },
      { id: 'db-2', name: 'Burj Khalifa', location: 'Burj Khalifa', price: 1200, rating: 4.9, image: require('../../assets/khalifa.jpg') },
      { id: 'db-3', name: 'Jumeirah Mosque', location: 'Jumeirah Mosque', price: 1150, rating: 4.6, image: require('../../assets/jume.jpg') },
      { id: 'db-4', name: 'Global Village', location: 'Global Village', price: 1100, rating: 4.7, image: require('../../assets/gb.jpg') },
      { id: 'db-5', name: 'The Dubai Mall', location: 'The Dubai Mall', price: 1120, rating: 4.8, image: require('../../assets/mall.jpg') },
    ]
  },
  {
    id: '11',
    name: 'Brazil',
    price: 620,
    rating: 4.5,
    image: require('../../assets/brazil.jpg'),
    description: 'Home to the vibrant rhythms of Carnival and the vast Amazon rainforest. Relax on sun-kissed beaches and soak in the energetic culture.',
    popularStays: [
      { id: 'br-1', name: 'Rio de Janeiro', location: 'Rio de Janeiro', price: 750, rating: 4.8, image: require('../../assets/rio.jpg') },
      { id: 'br-2', name: 'São Paulo', location: 'São Paulo', price: 820, rating: 4.7, image: require('../../assets/sao.jpg') },
      { id: 'br-3', name: 'Florianópolis', location: 'Florianópolis', price: 780, rating: 4.6, image: require('../../assets/flo.jpg') },
      { id: 'br-4', name: 'Paraty', location: 'Paraty', price: 810, rating: 4.9, image: require('../../assets/para.jpg') },
      { id: 'br-5', name: 'Ouro Preto', location: 'Ouro Preto', price: 790, rating: 4.8, image: require('../../assets/ouro.jpg') },
    ]
  },
  {
    id: '12',
    name: 'Spain',
    price: 830,
    rating: 4.7,
    image: require('../../assets/spain.webp'),
    description: 'A country of passionate culture, stunning architecture, and delicious cuisine. Explore historic cities and relax on sunny coasts.',
    popularStays: [
      { id: 'es-1', name: 'Madrid', location: 'Madrid', price: 880, rating: 4.9, image: require('../../assets/madrid.jpg') },
      { id: 'es-2', name: 'Barcelona', location: 'Barcelona', price: 900, rating: 4.8, image: require('../../assets/barca.jpg') },
      { id: 'es-3', name: 'Seville', location: 'Seville', price: 860, rating: 4.7, image: require('../../assets/sevi.jpg') },
      { id: 'es-4', name: 'Valencia', location: 'Valencia', price: 840, rating: 4.8, image: require('../../assets/val.webp') },
      { id: 'es-5', name: 'Segovia', location: 'Segovia', price: 870, rating: 4.6, image: require('../../assets/sego.jpg') },
      { id: 'es-6', name: 'San Sebastián', location: 'San Sebastián', price: 910, rating: 4.9, image: require('../../assets/san.jpg') },
    ]
  },
  {
    id: '13',
    name: 'Greece',
    price: 730,
    rating: 4.8,
    image: require('../../assets/greece.jpeg'),
    description: 'Step back in time to the cradle of Western civilization. Discover ancient ruins and sun-drenched islands with iconic white-washed villages.',
    popularStays: [
      { id: 'gr-1', name: 'Santorini', location: 'Santorini', price: 1000, rating: 5.0, image: require('../../assets/sant.jpg') },
      { id: 'gr-2', name: 'Crete', location: 'Crete', price: 930, rating: 4.8, image: require('../../assets/cre.jpg') },
      { id: 'gr-3', name: 'Corfu', location: 'Corfu', price: 960, rating: 4.7, image: require('../../assets/corfu.jpg') },
      { id: 'gr-4', name: 'Rhodes', location: 'Rhodes', price: 940, rating: 4.9, image: require('../../assets/rhode.jpg') },
      { id: 'gr-5', name: 'Athens', location: 'Athens', price: 980, rating: 4.8, image: require('../../assets/athen.jpg') },
      { id: 'gr-6', name: 'Nafplio', location: 'Nafplio', price: 920, rating: 4.6, image: require('../../assets/naf.jpg') },
    ]
  },
  {
    id: '14',
    name: 'Germany',
    price: 610,
    rating: 4.6,
    image: require('../../assets/germany.jpg'),
    description: 'A land of fairy-tale castles, rich history, and vibrant cities. Explore the enchanting Black Forest and enjoy world-famous festivals.',
    popularStays: [
      { id: 'de-1', name: 'Berlin', location: 'Berlin', price: 680, rating: 4.8, image: require('../../assets/berlin.webp') },
      { id: 'de-2', name: 'Munich', location: 'Munich', price: 700, rating: 4.7, image: require('../../assets/munich.webp') },
      { id: 'de-3', name: 'Cologne', location: 'Cologne', price: 660, rating: 4.5, image: require('../../assets/colo.webp') },
      { id: 'de-4', name: 'Heidelberg', location: 'Heidelberg', price: 690, rating: 4.9, image: require('../../assets/hei.webp') },
      { id: 'de-5', name: 'The Rhine Valley', location: 'The Rhine Valley', price: 670, rating: 4.8, image: require('../../assets/rhine.jpg') },
      { id: 'de-6', name: 'Nuremberg', location: 'Nuremberg', price: 650, rating: 4.6, image: require('../../assets/num.jpg') },
    ]
  },
  {
    id: '15',
    name: 'Austria',
    price: 450,
    rating: 4.5,
    image: require('../../assets/austria.webp'),
    description: 'Experience imperial elegance in Vienna, hike through breathtaking Alpine scenery, and immerse yourself in the world of classical music.',
    popularStays: [
      { id: 'au-1', name: 'Vienna', location: 'Vienna', price: 580, rating: 4.9, image: require('../../assets/vie.jpg') },
      { id: 'au-2', name: 'Salzburg', location: 'Salzburg', price: 600, rating: 4.8, image: require('../../assets/sal.jpg') },
      { id: 'au-3', name: 'Hallstatt', location: 'Hallstatt', price: 620, rating: 5.0, image: require('../../assets/hal.jpg') },
      { id: 'au-4', name: 'Kitzbühel', location: 'Kitzbühel', price: 570, rating: 4.7, image: require('../../assets/kitz.jpg') },
      { id: 'au-5', name: 'Mayrhofen', location: 'Mayrhofen', price: 560, rating: 4.6, image: require('../../assets/may.jpeg') },
      { id: 'au-6', name: 'St. Anton', location: 'St. Anton', price: 590, rating: 4.8, image: require('../../assets/ant.jpg') },
    ]
  },
];

interface HomeProps {
  navigation: any;
}

const LocationCard = React.memo(({ item, navigation }: any) => {
  const { text, images } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate(AppRoutes.LocationDetails, { locationData: item })}
    >
      <FastImage
        source={item.image}
        style={styles.locationCard}
        resizeMode={FastImage.resizeMode.cover}
      >
        <View style={styles.cardOverlay}>
          <View>
            <Text style={[styles.locationName, { color: text.imgText }]}>{item.name}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingText, { color: text.imgText }]}>{item.rating}</Text>
            <Image source={images.star} style={styles.starIcon} />
          </View>
        </View>
      </FastImage>
    </TouchableOpacity>
  );
});

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { colors, images, text } = useTheme();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  // --- NEW: State for filter modal and active sort option ---
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [activeSort, setActiveSort] = useState('default'); // 'default', 'rating_desc', 'price_asc', 'price_desc'

  // --- UPDATED: useMemo now handles both search and sort ---
  const filteredData = useMemo(() => {
    let result = travelData;

    // Apply search filter first
    if (searchValue) {
      result = result.filter(location =>
        location.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Create a copy before sorting to avoid mutating the original data
    const sortedResult = [...result];

    // Apply sorting
    switch (activeSort) {
      case 'rating_desc':
        sortedResult.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_asc':
        sortedResult.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedResult.sort((a, b) => b.price - a.price);
        break;
      default:
        // No sorting or return to original order
        break;
    }

    return sortedResult;
  }, [searchValue, activeSort]);

  const renderLocationCard = useCallback(({ item }: any) => (
    <LocationCard
      item={item}
      navigation={navigation}
    />
  ), [navigation]);

  // --- NEW: Function to apply the sort and close the modal ---
  const applySort = (sortType: string) => {
    setActiveSort(sortType);
    setFilterModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.parent}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Text style={[styles.subText, { color: colors.text }]}>Find your next trip</Text>
          <Text style={[styles.titleText, { color: colors.text }]} onPress={() => dispatch(setAuth(false))} >Select Your Destination</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <View style={[
            styles.searchInputWrapper,
            { borderColor: searchValue.length > 0 ? '#757575' : '#DBDBDB' }
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
          {/* --- UPDATED: Filter button now opens the modal --- */}
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
            <Image
              source={images.filter}
              style={styles.filterIcon}
              onError={(e) => console.log('Error loading filter image:', e.nativeEvent.error)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.popularSectionContainer}>
          <Text style={[styles.popularTitle, { color: colors.text }]}>Popular Locations</Text>
        </View>
        <FlatList
          data={filteredData}
          renderItem={renderLocationCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.flatListContentContainer, { paddingBottom: 20 }]}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
        />

        {/* --- NEW: Filter/Sort Modal --- */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFilterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sort By</Text>

              <TouchableOpacity style={styles.sortOptionButton} onPress={() => applySort('rating_desc')}>
                <Text style={styles.sortOptionText}>Rating (High to Low)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sortOptionButton} onPress={() => applySort('price_asc')}>
                <Text style={styles.sortOptionText}>Price (Low to High)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sortOptionButton} onPress={() => applySort('price_desc')}>
                <Text style={styles.sortOptionText}>Price (High to Low)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sortOptionButton} onPress={() => applySort('default')}>
                <Text style={styles.sortOptionText}>Reset</Text>
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

// --- Styles have been updated to include modal styles ---
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
  popularTitle: {
    fontSize: 22,
    fontFamily: 'NataSans-SemiBold',
  },
  flatListContentContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    gap: wp(4),
  },
  locationCard: {
    width: wp(85),
    height: hp(57),
    justifyContent: 'flex-end',
    padding: wp(4),
    borderRadius: 25,
    overflow: 'hidden',
  },
  cardOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  locationName: {
    fontSize: 24,
    fontFamily: 'NataSans-Bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginRight: wp(1),
  },
  starIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFC700',
    resizeMode: 'cover',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: wp(90),
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'NataSans-Bold',
    marginBottom: 10,
    color: '#000',
  },
  sortOptionButton: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortOptionText: {
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
  },
});

export default Home;