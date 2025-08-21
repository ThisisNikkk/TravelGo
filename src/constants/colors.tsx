import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    text: "black",
  },
  images: {
    logo: require("../assets/logo.png"),
    w1: require("../assets/w1.png"),
    w2: require('../assets/w2.png'),
    w3: require('../assets/w3.png'),
    arrow: require("../assets/arrow.png"),
  },
};

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "black",
    text: "white",
  },
  images: {
    logo: require("../assets/logo.png"),
    w1: require("../assets/w1.png"),
    w2: require('../assets/w2.png'),
    w3: require('../assets/w3.png'),
    arrow: require("../assets/arrow.png"),
  },
};
export { LightTheme, DarkTheme };
