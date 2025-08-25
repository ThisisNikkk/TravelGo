import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRoutes from "../RouteKeys/appRoutes";
import Tabs from "../../navigation/Tabs";
import LocationDetail from "../../screens/nonAuth/LocationDetails";

export default function NonAuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoutes.Tabs} component={Tabs} />
      <Stack.Screen name ={AppRoutes.LocationDetails} component={LocationDetail}/>
    </Stack.Navigator>
  );
}
