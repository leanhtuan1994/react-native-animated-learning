/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React from "react";
import { registerScreen, ScreenComponent } from "navigation/utils";
import { View, Dimensions, StyleSheet, Animated } from "react-native";
import { Image } from "react-native-elements";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.2;
const SIZE_INDICATOR = 8;
const SIZE_INDICATOR_BOUND = SIZE_INDICATOR + 8;
const INDICATOR_SPACE = 8;

const BANNER_DATA = [
  {
    key: "3571572",
    image:
      "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=500&q=80",
  },
  {
    key: "3571747",
    image:
      "https://images.unsplash.com/photo-1562569633-622303bafef5?w=500&q=80",
  },
  {
    key: "3571680",
    image:
      "https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=500&q=80",
  },
  {
    key: "3571603",
    image:
      "https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=500&q=80",
  },
];

const size = BANNER_DATA.length;

const styles = StyleSheet.create({
  indicator: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    left: width / 2 - size * SIZE_INDICATOR,
  },
  itemIndicator: {
    width: SIZE_INDICATOR,
    height: SIZE_INDICATOR,
    borderRadius: SIZE_INDICATOR / 2,
    backgroundColor: "white",
    marginRight: INDICATOR_SPACE,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  banner: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerItem: {
    width: ITEM_WIDTH - 24,
    height: ITEM_HEIGHT,
    borderRadius: 14,
    backgroundColor: "white",
    alignItems: "center",
    overflow: "hidden",
  },
  indicatorBound: {
    height: SIZE_INDICATOR_BOUND,
    width: SIZE_INDICATOR_BOUND,
    borderRadius: SIZE_INDICATOR_BOUND / 2,
    borderWidth: 1,
    borderColor: "white",
    position: "absolute",
    left: -SIZE_INDICATOR / 2,
    top: -SIZE_INDICATOR / 2,
  },
});

interface IndicatorParam {
  scrollX: Animated.Value;
}

const Indicator = ({ scrollX }: IndicatorParam) => {
  return (
    <View style={styles.indicator}>
      {BANNER_DATA.map((_, i) => {
        return <View key={`indicator-${i}`} style={styles.itemIndicator} />;
      })}
      <Animated.View
        style={{
          ...styles.indicatorBound,
          transform: [
            {
              translateX: Animated.divide(scrollX, ITEM_WIDTH).interpolate({
                inputRange: [0, 1],
                outputRange: [0, SIZE_INDICATOR + INDICATOR_SPACE],
              }),
            },
          ],
        }}
      />
    </View>
  );
};

interface Item {
  key: string;
  image: string;
}

interface BannerItemParam {
  item: Item;
}

const BannerItem = ({ item }: BannerItemParam) => {
  return (
    <View style={styles.banner}>
      <View style={styles.bannerItem}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const BannerItemView = React.memo(BannerItem);

const BannerName = "Banner";

export type BannerParam = {
  [BannerName]: {};
};

const BannerView: ScreenComponent<BannerParam, "Banner"> = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }: { item: Item }) => {
    return <BannerItemView item={item} />;
  };

  return (
    <>
      <View style={{ marginTop: 80 }}>
        <Animated.FlatList
          data={BANNER_DATA}
          keyExtractor={(item) => `list-key-${item.key}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: true,
            },
          )}
        />
        <Indicator scrollX={scrollX} />
      </View>
    </>
  );
};

export default registerScreen<BannerParam, "Banner">(BannerName, BannerView);
