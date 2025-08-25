import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRoutes from "../RouteKeys/appRoutes";
import Tabs from "../../navigation/Tabs";
import LocationDetail from "../../screens/nonAuth/LocationDetails";
import Map from "../../screens/nonAuth/Map";

export default function NonAuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.Tabs} component={Tabs} options={{animation:'slide_from_right'}}/>
      <Stack.Screen name ={AppRoutes.LocationDetails} component={LocationDetail} options={{animation:'slide_from_bottom'}}/>
      <Stack.Screen name ={AppRoutes.Map} component={Map} options={{animation:'slide_from_right'}}/>
    </Stack.Navigator>
  );
}
