import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SolidView from "../components/SolidView";
import AppUtils from "../../utils/appUtils";

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { colors, images } = useTheme();

  return (
    <SolidView
      viewStyle={styles.parent}
      view={
        <Text style={[styles.titleText, { color: colors.text }]}>
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
    fontSize: AppUtils.fontSize(20),
    alignSelf: "center",
    textAlign: "center",
    marginTop:20
  },
});

export default Home;
