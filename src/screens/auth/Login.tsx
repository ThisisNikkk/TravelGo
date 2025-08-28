import { useNavigation, useTheme, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { setAuth, setToken, setUser } from "../../redux/Reducers/userData";
import AppRoutes from "../../routes/RouteKeys/appRoutes";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import auth, { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from '@react-native-firebase/firestore';


const Login: React.FC = () => {
     const { colors, images } = useTheme();
        const dispatch = useDispatch();
        const navigation: any = useNavigation();
        const route: any = useRoute();
    
        const logo = require('../../assets/logo.png');
        const back = require('../../assets/Back.png');
    
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [errorMessage, setErrorMessage] = useState('');
        const [loading, setLoading] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
    
        const areInputsFilled = email.length > 0 && password.length > 0;
    
        useEffect(() => {
            if (route.params?.email) {
                setEmail(route.params.email);
            }
        }, [route.params?.email]);

    const fetchUser = async (User :any) => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', User.uid);
    const userDetail = await getDoc(userDocRef);
    if (userDetail.exists()) {
      dispatch(setUser(userDetail.data())); 
    }
    const idToken = await User.getIdToken();
    dispatch(setToken(idToken)); 
    dispatch(setAuth(true)); 
  };


    const handleLogin = async () => {
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Please Enter Both Email And Password.");
      return;
    }
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await fetchUser(userCredential.user);
    } catch (error: any) {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setErrorMessage("Invalid Credentials. Please Try again.");
      } else {
        setErrorMessage("Login Failed. Please Try Again.");
      }
    } finally {
      setLoading(false);
    }
  };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1}}>
                <StatusBar
                    animated={true}
                    backgroundColor="white"
                    barStyle="dark-content"
                    hidden={false}
                />
                <View style={styles.customHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={images.back} style = {styles.backButtonImg} />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentArea}>
                    <Image source={images.welcomeLogo} style={styles.logo} />
                    <Text style={[styles.welcomeText, {color:colors.text}]}>Welcome back! </Text>
                    <Text style={[styles.emailText, {color:colors.text}]}>Password</Text>
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            style={[
                                styles.input,{color:colors.text},
                                styles.passwordInput,
                                { borderColor: password.length > 0 ? '#757575' : '#DBDBDB' }
                            ]}
                            placeholder="Your password..."
                            placeholderTextColor={colors.text}
                            keyboardType="default"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        >
                        </TextInput>
                        <TouchableOpacity
                            style={styles.passwordToggle}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Text style={[styles.passwordToggleText,{color:colors.text}]}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                    <TouchableOpacity
                        style={[
                            styles.button,
                            {backgroundColor: areInputsFilled ? '#0373F3' : '#DBDBDB' }
                        ]}
                        disabled={!areInputsFilled || loading}
                        onPress={handleLogin}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Continue</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[styles.contentText, {color:colors.text}]}>
                            Forgot Password
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 80,
    },
    logo: {
        height: 124,
        width: 124,
        marginVertical: 40,
    },
    welcomeText: {
        fontSize: 28,
        fontFamily: 'NataSans-SemiBold',
        lineHeight: 35,
        marginVertical: 17,
        marginBottom: 30,
    },
    emailText: {
        fontFamily: 'NataSans-Light',
        alignSelf: 'flex-start',
        fontSize: 14,
        lineHeight: 24,
        marginVertical: 10,
    },
    input: {
        borderRadius: 15,
        borderColor: '#DBDBDB',
        borderWidth: 1,
        width: '100%',
        height: 55,
        paddingHorizontal: 20,
        fontFamily: 'Poppins-Regular',
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        borderColor: '#DBDBDB',
        borderWidth: 1,
        width: '100%',
        height: 55,
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        borderWidth: 0,
        padding: 12,
        height: '100%',
    },
    passwordToggle: {
        paddingHorizontal: 15,
        height: '100%',
        justifyContent: 'center',
    },
    passwordToggleText: {
        color: '#050505',
        fontFamily: 'Poppins-Medium',
        fontSize: 13,
        lineHeight:24,
    },
    button: {
        width: '100%',
        height: 55,
        borderRadius: 30,
        padding: 12,
        marginVertical: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontFamily: 'NataSans-Medium',
        lineHeight: 30,
        color: '#FFFFFF',
        textAlign: 'center',
        alignSelf: 'center',
    },
    contentText: {
        fontSize: 15,
        lineHeight: 25,
        fontFamily: "NataSans-Medium",
        alignSelf: 'flex-start',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        marginTop: 5,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    customHeader: {
        paddingHorizontal: 20,
        paddingTop: 10,
        alignItems: 'flex-start',
    },
    backButton: {
        padding: 5,
        marginVertical:30,
    },
    backButtonImg: {
       height:30,
       width:30,
       resizeMode:'contain',
    },
    contentArea: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 80,
    },
});
export default Login;