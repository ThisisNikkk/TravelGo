import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect} from "react";
import { View, StyleSheet, Text, Image, Touchable, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { LocalizationContext } from "../../localization/localization";
import { setAuth } from "../../redux/Reducers/userData";
import AppRoutes from "../../routes/RouteKeys/appRoutes";
import SolidBtn from "../components/SolidBtn";
import SolidView from "../components/SolidView";
import AppUtils from "../../utils/appUtils";
import { hp, wp } from "../../utils/dimension";

const WelcomeScreen2: React.FC = () => {
  const { colors, images } = useTheme();
  const { localization } = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  return (
    <SolidView
      view={
        <View style={{ flex: 1,alignItems:'center' }}>
          <Image source={images.w2} style={style.walkthroughImg}/>
          <Text
            style={[style.titleText, { color: colors.text }]}
          >
           Customize your{'\n'} High-end travel
          </Text>
          <Text
            style={[style.subText, { color: colors.text }]}
          >
            Countless high-end{'\n'} entertainment facilities
          </Text>
          <TouchableOpacity style={style.btn}
            onPress={()=> navigation.replace(AppRoutes.WelcomeScreen3)}
          >
            <Image source={images.arrow} style={style.btnImg}/>
          </TouchableOpacity>
        </View>
      }

    />
  );
}

const style = StyleSheet.create({
  walkthroughImg:{
    height:hp(52),
    width:wp(110),
    resizeMode:'contain',
    alignSelf:'center',
  },
  titleText: {
    fontSize: 30,
    fontFamily:'NataSans-Bold',
    alignSelf: "center",
    textAlign: "center",
    marginBottom:hp(2.5),
  },
  subText:{
    fontSize:18,
    fontFamily:'Poppins-Regular',
    lineHeight:25,
    alignSelf: "center",
    textAlign: "center",
  },
  btn:{
    backgroundColor:'#0373F3',
    marginVertical:hp(4),
    borderRadius:50,
    opacity:0.8,
    padding:20,
  },
  btnImg:{
    width:55,
    height:55,
    resizeMode:'contain',
  },
});
export default WelcomeScreen2;
