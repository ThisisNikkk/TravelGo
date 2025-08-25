import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppRoutes from "../../routes/RouteKeys/appRoutes";
import App from "../../../App";
import { setAuth, setUser, setToken } from '../../redux/Reducers/userData';
import auth, {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';

import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";



GoogleSignin.configure({
  webClientId: '428681596840-80jh0rl29214d9k8eu3q482d8ffelv3g.apps.googleusercontent.com',
});


const Welcome: React.FC = () => {
  const { colors, images } = useTheme();
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const appleLogo = require('../../assets/Apple.png');

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isGoogleSelected, setIsGoogleSelected] = useState(false);
  const [isAppleSelected, setIsAppleSelected] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const isLightMode = colors.background === "white" || colors.background === "#ffffff";
  const isEmailInputFilled = email.length > 0;


  const fetchUser = async (User: any) => {
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

  const handleContinue = async () => {
    setErrorMessage('');
    if (!email) {
      setErrorMessage('Please Enter A Email Address.');
      return;
    }

    try {
      const methods = await auth().fetchSignInMethodsForEmail(email);
      if (methods && methods.length > 0) {
        navigation.navigate(AppRoutes.Login, { email });
      } else {
        navigation.navigate(AppRoutes.SignUp, { email });
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('The Email Address Is Not Valid.');
      } else {
        setErrorMessage('An Error Cccurred. Please Try Again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      await GoogleSignin.signOut();
      const signInResult = await GoogleSignin.signIn();
      let idToken = signInResult.idToken || signInResult.user?.idToken || signInResult?.data?.idToken;
      if (!idToken) {
        throw new Error("No ID token found");
      }
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(getAuth(), googleCredential);
      const { uid, displayName, email, photoURL } = userCredential.user;
      await getFirestore().collection('users').doc(uid).set({
        name: displayName || "",
        email: email || "",
        photoURL: photoURL || "",
        provider: "google"
      }, { merge: true });
      await fetchUser(userCredential.user);
      navigation.navigate(AppRoutes.Home);
    } catch (error: any) {
      console.error("Google Sign-In Error", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.parent}>
          <Image source={images.welcomeLogo} style={styles.logo} />
          <Text style={[styles.welcomeText, { color: colors.text }]}> Log in or sign up</Text>
          <Text style={[styles.emailText, { color: colors.text }]}>Email</Text>
          <TextInput
            style={[
              styles.input, { color: colors.text },
              { borderColor: errorMessage ? '#DF3A3A' : (isEmailInputFilled ? '#757575' : '#DBDBDB') }
            ]}
            placeholder="Your email..."
            placeholderTextColor={colors.text}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity
            style={[styles.button,
            { backgroundColor: isEmailInputFilled ? '#0373F3' : '#DBDBDB' }
            ]}
            onPress={handleContinue}
          >
            <Text style={[styles.buttonText]}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity
            style={[
              styles.googleButton,
              { borderColor: isGoogleSelected ? '#757575' : '#DBDBDB' }
            ]}
            onPress={handleGoogleLogin}
          >
            {googleLoading ? (
              <ActivityIndicator color={isLightMode ? "black" : "white"} />
            ) : (
              <>
                <Image source={images.google} style={styles.buttonlogo} />
                <Text style={[styles.buttonLogoText, { color: colors.text }]}>
                  Continue with Google
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.appleButton,
              { borderColor: isAppleSelected ? '#757575' : '#DBDBDB' }
            ]}
            onPress={() => setIsAppleSelected(!isAppleSelected)}
          >
            <Image source={images.apple} style={styles.buttonlogo} />
            <Text style={[styles.buttonLogoText, { color: colors.text }]}>
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  logo: {
    height: 124,
    width: 124,
    marginVertical: 15,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'NataSans-Medium',
    lineHeight: 38,
  },
  emailText: {
    fontFamily: 'NataSans-Light',
    alignSelf: 'flex-start',
    fontSize: 14,
    lineHeight: 24,
    marginVertical: 10,
    left: 5,
  },
  input: {
    borderRadius: 30,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    width: '100%',
    height: 55,
    padding: 12,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    padding: 12,
    marginVertical: 22,
    fontFamily: 'NataSans-SemiBold',
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'NataSans-SemiBold',
    lineHeight: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
  },
  orText: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    lineHeight: 30,
  },
  googleButton: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
    width: '100%',
    height: 55,
    borderRadius: 30,
    padding: 12,
    marginVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  appleButton: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
    width: '100%',
    height: 55,
    borderRadius: 30,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  buttonlogo: {
    height: 24,
    width: 24,
    alignSelf: 'center',
    left: 23,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  buttonLogoText: {
    color: '#050505',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 25,
    right: 15,
  },
});

export default Welcome;