import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { wp, hp } from '../utils/dimension';
import Home from '../screens/nonAuth/Home';

const Tab = createMaterialTopTabNavigator();

const Tabs = () => {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            tabBarPosition='bottom'
            screenOptions={{
                tabBarShowLabel: false,
                swipeEnabled: false,
                tabBarStyle: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0, 
                    borderTopRightRadius: wp(10),
                    borderTopLeftRadius: wp(10),
                    backgroundColor: colors.background,
                    height: hp(10),
                    borderTopWidth: 0,
                    elevation: 5,
                },
                tabBarIndicatorStyle: {
                    display: 'none',
                },
            }}
        >
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabItem}>
                            <Image
                                source={require('../assets/Home.png')}
                                style={[styles.tabIcon, { tintColor: focused ? '#0373F3' : '#BCBCBC' }]}
                            />
                            <Text style={[styles.tabText, { color: focused ? '#0373F3' : '#BCBCBC' }]}>
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen name='Wallet' component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabItem}>
                            <Image
                                source={require('../assets/Bag.png')}
                                style={[styles.tabIcon, { tintColor: focused ? '#0373F3' : '#BCBCBC' }]}
                            />
                            <Text style={[styles.tabText, { color: focused ? '#0373F3' : '#BCBCBC' }]}>
                                Wallet
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen name='Guide' component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabItem}>
                            <Image
                                source={require('../assets/Guide.png')}
                                style={[styles.tabIcon, { tintColor: focused ? '#0373F3' : '#BCBCBC' }]}
                            />
                            <Text style={[styles.tabText, { color: focused ? '#0373F3' : '#BCBCBC' }]}>
                                Wallet
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen name='Chart' component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabItem}>
                            <Image
                                source={require('../assets/Chart.png')}
                                style={[styles.tabIcon, { tintColor: focused ? '#0373F3' : '#BCBCBC' }]}
                            />
                            <Text style={[styles.tabText, { color: focused ? '#0373F3' : '#BCBCBC' }]}>
                                Wallet
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabItem: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginBottom: 4,
    },
    tabText: {
        fontFamily: 'NataSans-SemiBold',
        fontSize: 12,
        fontWeight: '600',
    }
});

export default Tabs;