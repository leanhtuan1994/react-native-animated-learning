/* eslint-disable max-len */
import React from "react";
import { View, Dimensions, StyleSheet, StatusBar } from "react-native";
import { registerScreen, ScreenComponent } from "navigation/utils";
import { Image, Text } from "react-native-elements";
import Animated, { Extrapolate, Value } from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");

const HEADER_IMAGE_HEIGHT = height / 3;

const articleParagraphs = [
  "One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy. ",
  "Folly words widow one downs few age every seven. If miss part by fact he park just shew. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow equal an share least. ",
  "Another journey chamber way yet females man. Way extensive and dejection get delivered deficient sincerity gentleman age. Too end instrument possession contrasted motionless. Calling offence six joy feeling. Coming merits and was talent enough far. Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard. ",
  "Village did removed enjoyed explain nor ham saw calling talking. Securing as informed declared or margaret. Joy horrible moreover man feelings own shy. Request norland neither mistake for yet. Between the for morning assured country believe. On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common. My little garret repair to desire he esteem. ",
  "In it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. ",
  "Had denoting properly jointure you occasion directly raillery. In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom gay nor design age. Am weather to entered norland no in showing service. Nor repeated speaking shy appetite. Excited it hastily an pasture it observe. Snug hand how dare here too. ",
  "Improve ashamed married expense bed her comfort pursuit mrs. Four time took ye your as fail lady. Up greatest am exertion or marianne. Shy occasional terminated insensible and inhabiting gay. So know do fond to half on. Now who promise was justice new winding. In finished on he speaking suitable advanced if. Boy happiness sportsmen say prevailed offending concealed nor was provision. Provided so as doubtful on striking required. Waiting we to compass assured. ",
];

const getImage = (i: number) =>
  `https://source.unsplash.com/600x${400 + i}/?blackandwhite`;

const HeaderName = "HeaderImage";

export type HeaderParam = {
  [HeaderName]: {};
};

const HeaderImage: ScreenComponent<HeaderParam, "HeaderImage"> = ({}) => {
  const scrollY = React.useRef(new Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const top = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolateLeft: Extrapolate.CLAMP,
  });

  return (
    <>
      <StatusBar hidden />
      <View style={{ flex: 1 }}>
        <Animated.Image
          style={[
            {
              position: "absolute",
              left: 0,
              top: 0,
              width,
              resizeMode: "cover",
            },
            {
              top,
              height: headerHeight,
            },
          ]}
          source={{ uri: getImage(1) }}
        />
        <Animated.ScrollView
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } },
          ])}
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ marginHorizontal: 12 }}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <View style={{ height: HEADER_IMAGE_HEIGHT }} />
          <Text style={{ fontSize: 32, fontWeight: "800", marginVertical: 12 }}>
            Black & White
          </Text>
          {articleParagraphs.map((para, index) => {
            return (
              <View key={`para-key-${index}`}>
                {index && index % 3 === 0 ? (
                  <Image
                    style={{
                      width: "100%",
                      height: height * 0.4,
                      resizeMode: "cover",
                      marginBottom: 20,
                    }}
                    source={{ uri: getImage(index) }}
                  />
                ) : undefined}
                <Text
                  style={{
                    flex: 1,
                    marginBottom: 10,
                    fontSize: 14,
                    lineHeight: 16 * 1.5,
                  }}>
                  {para}
                </Text>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    </>
  );
};

export default registerScreen<HeaderParam, "HeaderImage">(
  HeaderName,
  HeaderImage,
);
