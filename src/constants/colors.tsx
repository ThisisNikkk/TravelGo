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
    welcomeLogo: require('../assets/logodark.png'),
    google: require('../assets/Google.png'),
    apple: require('../assets/Apple.png'),

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
    welcomeLogo: require('../assets/logo.png'),
    google: require('../assets/googleWhite.png'),
    apple: require('../assets/appleWhite.png'),


  },
};
export { LightTheme, DarkTheme };
