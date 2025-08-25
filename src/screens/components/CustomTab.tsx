import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, Dimensions, Text, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Define your icons here
const ICONS = {
    HomeScreen: require('../assets/Home.png'),
    Wallet: require('../assets/Bag.png'),
    Guide: require('../assets/Guide.png'),
    Chart: require('../assets/Chart.png'),
};

const CustomTab = ({ state, navigation }) => {
    const { routes, index: activeIndex } = state;
    const tabWidth = width / routes.length;

    const translateX = useSharedValue(0);

    useEffect(() => {
        translateX.value = withTiming(activeIndex * tabWidth, { duration: 300 });
    }, [activeIndex, tabWidth, translateX]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <View style={[styles.tabBarContainer, { width }]}>
            <Animated.View style={[styles.indicator, { width: tabWidth }, animatedStyle]} />

            {routes.map((route, index) => {
                const isFocused = activeIndex === index;
                const color = isFocused ? '#0373F3' : '#BCBCBC';

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        style={styles.tabItem}
                    >
                        <Image
                            source={ICONS[route.name]}
                            style={[styles.tabIcon, { tintColor: color }]}
                        />
                        <Text style={[styles.tabText, { color }]}>{route.name}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        height: 80, // Adjust height as needed
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabIcon: {
        width: 28,
        height: 28,
        marginBottom: 4,
    },
    tabText: {
        fontSize: 12,
        fontWeight: '600',
    },
    indicator: {
        position: 'absolute',
        top: 0,
        height: 4, // Height of the indicator line
        backgroundColor: '#0373F3',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
});

export default CustomTab;