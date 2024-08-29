import React, { useEffect } from "react";
import { View, Image } from "react-native";
import SplashStyle from "../Styles/SplashStyle";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={SplashStyle.splashcontainer}>
      <Image
        source={require("../assets/SplashImage.jpg")}
        style={SplashStyle.splash}
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashScreen;