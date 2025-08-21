import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../../screens/auth/Splash";
import AppRoutes from "../RouteKeys/appRoutes";
import WelcomeScreen1 from "../../screens/auth/WelcomeScreen1";
import WelcomeScreen2 from "../../screens/auth/WelcomeScreen2";
import WelcomeScreen3 from "../../screens/auth/WelcomeScreen3";
import Welcome from "../../screens/auth/Welcome";
import SignUp from "../../screens/auth/SignUp";
import Login from "../../screens/auth/Login";

export default function AuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false,}} >
      <Stack.Screen name={AppRoutes.Splash} component={Splash}/>
      <Stack.Screen name={AppRoutes.WelcomeScreen1} component={WelcomeScreen1} options={{animation: 'slide_from_right',}}/>
      <Stack.Screen name={AppRoutes.WelcomeScreen2} component={WelcomeScreen2} options={{animation:'slide_from_right'}}/>
      <Stack.Screen name={AppRoutes.WelcomeScreen3} component={WelcomeScreen3} options={{animation:'slide_from_right'}}/>
      <Stack.Screen name={AppRoutes.Welcome} component={Welcome} options={{animation:'slide_from_bottom'}}/>
      <Stack.Screen name={AppRoutes.SignUp} component={SignUp} options={{animation:'slide_from_right'}}/>
      <Stack.Screen name={AppRoutes.Login} component={Login} options={{animation:'slide_from_right'}}/>
    </Stack.Navigator>
  );
}
