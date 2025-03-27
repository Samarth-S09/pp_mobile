import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Svg, { Line, Circle } from "react-native-svg";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDecay,
} from "react-native-reanimated";

const canvasWidth = 330;
const canvasHeight = 400;

type Props = {
  path: string[];
  coordinates: { [key: string]: [number, number] };
};

export default function StationMap({ path, coordinates }: Props) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [-300, 300],
      });
      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [-300, 300],
      });
    },
  });

  const handleDoubleTap = () => {
    const newScale = Math.min(scale.value + 0.3, 2.5);
    scale.value = withTiming(newScale, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const resetMap = () => {
    scale.value = withTiming(1);
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
  };

  return (
    <View style={styles.wrapper}>
      <TapGestureHandler numberOfTaps={2} onActivated={handleDoubleTap}>
        <Animated.View style={[styles.mapContainer, animatedStyle]}>
          <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View>
              <Image
                source={require("../../assets/KalwaMapMobile.png")}
                style={styles.mapImage}
                resizeMode="contain"
              />
              <Svg
                width={canvasWidth}
                height={canvasHeight}
                style={StyleSheet.absoluteFill}
              >
                {path.map((node, i) => {
                  const [x1, y1] = coordinates[node] ?? [0, 0];
                  const [x2, y2] = coordinates[path[i + 1]] ?? [0, 0];
                  if (!path[i + 1]) return null;
                  return (
                    <Line
                      key={`line-${i}`}
                      x1={x1 * canvasWidth}
                      y1={y1 * canvasHeight}
                      x2={x2 * canvasWidth}
                      y2={y2 * canvasHeight}
                      stroke="orange"
                      strokeWidth="2"
                    />
                  );
                })}

                {path.map((node, i) => {
                  const [x, y] = coordinates[node] ?? [0, 0];
                  return (
                    <Circle
                      key={`circle-${i}`}
                      cx={x * canvasWidth}
                      cy={y * canvasHeight}
                      r="6"
                      fill="red"
                    />
                  );
                })}
              </Svg>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>

      <TouchableOpacity style={styles.resetButton} onPress={resetMap}>
        <Text style={styles.resetText}>🔄</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: canvasWidth,
    height: canvasHeight,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 20,
  },
  mapContainer: {
    width: canvasWidth,
    height: canvasHeight,
  },
  mapImage: {
    width: canvasWidth,
    height: canvasHeight,
    position: "absolute",
    top: 0,
    left: 0,
  },
  resetButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    elevation: 4,
  },
  resetText: {
    fontSize: 18,
  },
});
