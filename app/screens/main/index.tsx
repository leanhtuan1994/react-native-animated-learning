import React from "react";
import { View, StyleSheet } from "react-native";
import { registerScreen, ScreenComponent } from "navigation/utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Name = "Splash";

const options = {
  stackAnimation: "fade",
};

export type SplashParam = {
  [Name]: {};
};

const Splash: ScreenComponent<SplashParam, "Splash"> = ({}) => {
  return (
    <>
      <View style={styles.container} />
    </>
  );
};

export default registerScreen<SplashParam, "Splash">(Name, Splash, options);
