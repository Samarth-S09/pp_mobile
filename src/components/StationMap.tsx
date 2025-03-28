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
import RemixIcon from "react-native-remix-icon";
import { TouchableWithoutFeedback } from "react-native";

const canvasWidth = 330;
const canvasHeight = 400;

type Props = {
  path: string[];
  coordinates: { [key: string]: [number, number] };
  fromNode: string;
  toNode: string;
  onReset: () => void;
};

export default function StationMap({ path, coordinates, fromNode, toNode, onReset }: Props) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [is3DMode, setIs3DMode] = React.useState(false);

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

  const open3DApp = () => {
    console.log("🟧 3D Mode activated");
    setIs3DMode(true);
  };

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
    onReset(); // ✅ reset path + dropdowns
  };  

  if (is3DMode) {
    return (
      <TouchableWithoutFeedback onPress={() => setIs3DMode(false)}>
        <View
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            zIndex: 1,
            height: 1000,
            width: 1000,
          }}
        />
      </TouchableWithoutFeedback>
    );
  }
  
  

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
                  const isStartNode = i === 0;
                  return (
                    <Circle
                      key={`circle-${i}`}
                      cx={x * canvasWidth}
                      cy={y * canvasHeight}
                      r={isStartNode ? "6" : "4"}
                      fill={isStartNode ? "lime" : "red"}
                    />
                  );
                })}
              </Svg>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>

      <TouchableOpacity style={styles.resetButton} onPress={resetMap}>
        <RemixIcon name="refresh-line" size={21} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.threeDButton} onPress={open3DApp}>
        <Text style={{ fontWeight: "bold", color: "#000" }}>3D</Text>
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
  threeDButton: {
    position: "absolute",
    top: 50, // just below reset
    right: 10,
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 4,
  },  
  resetText: {
    fontSize: 16,
  },
});
