/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ScreenComponent, registerScreen } from "navigation/utils";
import { View, Image, StatusBar, StyleSheet, Animated } from "react-native";
import faker from "faker";
import { Text } from "react-native-elements";
import { GlobalStyles } from "styles";

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      "women",
      "men",
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const Name = "Effect";

export type Param = {
  [Name]: {};
};

const ScrollEffect: ScreenComponent<Param, "Effect"> = ({}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "fff" }}>
      <Image
        source={require("../../../assets/images/background.jpg")}
        style={{ ...StyleSheet.absoluteFillObject }}
        blurRadius={80}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        data={DATA}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                ...GlobalStyles.shadow,
                flexDirection: "row",
                padding: SPACING,
                marginBottom: SPACING,
                borderRadius: 12,
                backgroundColor: "rgba(255,255,255,0.8)",
                opacity,
                transform: [
                  {
                    scale,
                  },
                ],
              }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE / 2,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text
                  style={{
                    ...GlobalStyles.font({
                      fontSize: 22,
                      fontWeight: "700",
                    }),
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    ...GlobalStyles.font({
                      fontSize: 18,
                      opacity: 0.7,
                    }),
                  }}>
                  {item.jobTitle}
                </Text>
                <Text
                  style={{
                    ...GlobalStyles.font({
                      fontSize: 14,
                      opacity: 0.8,
                      color: "#0099cc",
                    }),
                  }}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default registerScreen<Param, "Effect">("Effect", ScrollEffect);
