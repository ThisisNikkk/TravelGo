import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SolidView from "../components/SolidView";
import AppUtils from "../../utils/appUtils";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/Reducers/userData";

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { colors, images } = useTheme();
  const dispatch = useDispatch();

  return (
    <SolidView
      viewStyle={styles.parent}
      view={
        <Text style={[styles.titleText, { color: colors.text }]} onPress={()=> dispatch(setAuth(false))}>
          {"Welcome Home\nSolidAppMaker"}
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center"
  },
  titleText: {
    fontSize: AppUtils.fontSize(24),
    alignSelf: "center",
    textAlign: "center",
    marginTop:270
  },
});

export default Home;
