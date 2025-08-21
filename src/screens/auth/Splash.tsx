import React, { useEffect } from "react";
import { View, StyleSheet, Image, useColorScheme, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation, useTheme } from "@react-navigation/native";
import AppRoutes from "../../routes/RouteKeys/appRoutes";

const Splash: React.FC = () => {
  const auth = useSelector((state: any) => state.userData.auth);
  const { colors, images } = useTheme();
  const navigation: any = useNavigation();
  const splash = require('../../assets/Splash.png')

  useEffect(() => {
    setTimeout(() => {
      auth
        ? navigation.replace(AppRoutes.NonAuthStack)
        : navigation.replace(AppRoutes.WelcomeScreen1);
    }, 3000);
  }, []);

  return (
    <ImageBackground  source={splash} style={[style.parent]}>
      <Image source={images.logo} style={style.image} />
    </ImageBackground>
  );
}
const style = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 100,
    height:100,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
export default Splash;
