import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { hp, wp } from '../../utils/dimension'; 

// Props interface for type safety
interface LocationDetailProps {
  navigation: any;
  route: any;
}

const LocationDetail: React.FC<LocationDetailProps> = ({ navigation, route }) => {
  const { colors, images } = useTheme();
  const { locationData } = route.params; 

  const description = `Blue Lagoon Drive from Reykjavik, the capital of Iceland, to the southeast for about an hour, you can reach Blue Lagoon, the famous`;

  return (
    <SafeAreaProvider>
      <View style={styles.parent}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={locationData.image} style={styles.backgroundImage}>
          <View style={styles.overlay} />

          <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Image source={images.backArrow} style={styles.backArrowIcon} />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>{locationData.name}</Text>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.ratingSection}>
              <View style={styles.ratingStars}>
                <Image source={images.star} style={styles.starIcon} />
                <Image source={images.star} style={styles.starIcon} />
                <Image source={images.star} style={styles.starIcon} />
                <Image source={images.star} style={styles.starIcon} />
                <Image source={images.star} style={styles.starIcon} />
                <Text style={styles.ratingText}>
                  {locationData.rating} (78 reviews)
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeReviews}>See reviews</Text>
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.planButton}>
                <Text style={styles.planButtonText}>Enter the plan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.otherButton}>
                <Text style={styles.otherButtonText}>View other</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(5),
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: wp(6),
    paddingBottom: hp(5),
  },
  title: {
    fontSize: 42,
    color: '#FFFFFF',
    fontFamily: 'NataSans-SemiBold', // Use a bold font
    marginBottom: hp(1),
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    opacity: 0.9,
    lineHeight: 24,
    marginBottom: hp(2),
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(4),
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFC700',
    marginRight: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
  },
  seeReviews: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planButton: {
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    paddingVertical: hp(2),
    borderRadius: 30,
    flex: 1,
    marginRight: wp(4),
    alignItems: 'center',
  },
  planButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  otherButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: hp(2),
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
  },
  otherButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default LocationDetail;