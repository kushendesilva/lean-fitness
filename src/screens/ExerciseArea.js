import React, { useState, useEffect } from "react";
import { ScrollView, Image } from "react-native";
import {
  Button,
  Layout,
  Text,
  useTheme,
  ButtonGroup,
  Icon,
} from "@ui-kitten/components";
import Screen from "../components/Screen";
import areas from "../../assets/areas.json";

export default function ({ navigation, route }) {
  const theme = useTheme();
  const [buttonName, setButtonName] = useState("Skip Exercise");

  const { area } = route.params;

  const exerciseData = areas.areas.find((data) => data.area === area);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exercise, setExercise] = useState(
    exerciseData && exerciseData.exercises[currentIndex]
  );

  const [timer, setTimer] = useState(exercise.timeInSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isTimerRunning && timer > 0) {
      intervalId = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      clearTimeout(intervalId);
    };
  }, [isTimerRunning, timer]);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    setButtonName("Next Exercise");
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
    setButtonName("Next Exercise");
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    setTimer(exercise && exercise.timeInSeconds);
    setButtonName("Skip Exercise");
  };

  const handleNextExercise = () => {
    if (exerciseData && currentIndex + 1 < exerciseData.exercises.length) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setExercise(exerciseData.exercises[newIndex]);
      setTimer(exerciseData.exercises[newIndex].timeInSeconds);
      setIsTimerRunning(false);
      setButtonName("Skip Exercise");
      if (newIndex + 1 == exerciseData.exercises.length) {
        setButtonName("Complete Workout");
      }
    } else {
      navigation.navigate("Home");
    }
  };

  const RunIcon = (props) => <Icon {...props} name="play-circle-outline" />;
  const PauseIcon = (props) => <Icon {...props} name="pause-circle-outline" />;
  const ResetIcon = (props) => <Icon {...props} name="refresh-outline" />;

  if (!exerciseData) {
    return (
      <Layout>
        <Text>No exercise data found for the given type and weight.</Text>
      </Layout>
    );
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Layout
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              height: 400,
              width: 400,
            }}
            source={{ uri: exercise.gifPath }}
          />
        </Layout>
        <Layout
          style={{
            flex: 3,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <Layout
            style={{
              backgroundColor: theme["color-primary-500"],
              borderRadius: 10,
              marginHorizontal: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 10,
                marginTop: 20,
              }}
              category="h4"
              appearance="alternative"
            >
              {exercise.exerciseName}
            </Text>
            <Layout
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                backgroundColor: theme["color-primary-500"],
                borderRadius: 10,
              }}
            >
              <Layout
                style={{
                  backgroundColor: theme["color-info-100"],
                  padding: 20,
                  borderRadius: 50,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                  category="h6"
                >
                  {timer} seconds
                </Text>
              </Layout>
              <Layout
                style={{
                  flexDirection: "row",
                  marginBottom: 25,
                  borderRadius: 10,
                }}
              >
                <ButtonGroup size="large" appearance="outline">
                  <Button onPress={handleStartTimer} accessoryLeft={RunIcon} />
                  <Button
                    onPress={handlePauseTimer}
                    accessoryLeft={PauseIcon}
                  />
                  <Button onPress={handleStopTimer} accessoryLeft={ResetIcon} />
                </ButtonGroup>
              </Layout>
            </Layout>
          </Layout>
          <Button
            size="large"
            style={{
              marginTop: 30,
              marginHorizontal: 10,
            }}
            onPress={handleNextExercise}
            disabled={isTimerRunning}
          >
            {buttonName}
          </Button>
        </Layout>
      </ScrollView>
    </Screen>
  );
}
