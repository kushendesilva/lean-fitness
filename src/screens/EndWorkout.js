import React from "react";
import { Image } from "react-native";
import { Text, Button, Layout } from "@ui-kitten/components";
import Screen from "../components/Screen";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore/lite";

const EndWorkout = ({ navigation, route }) => {
  const { elapsedTime } = route.params;
  const handleEndWorkout = async () => {
    try {
      const db = getFirestore();

      const { uid, elapsedTime, type } = route.params;

      if (!uid) {
        console.error("uid is undefined");
        return;
      }

      await addDoc(collection(db, "workouts"), {
        uid,
        elapsedTime,
        type,
        createdAt: serverTimestamp(),
      });

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error while syncing", error);
    }
  };

  return (
    <Screen backAction={handleEndWorkout} headerTitle={"End Workout"}>
      <Layout style={{ marginHorizontal: 20 }}>
        <Layout
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              height: 320,
              width: 320,
            }}
            source={require("../../assets/images/6.jpg")}
          />
        </Layout>
        <Text
          category="h5"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginVertical: 20,
          }}
        >
          End Workout
        </Text>
        {/* Display workout summary or any other content */}
        <Text style={{ marginBottom: 20, textAlign: "center" }}>
          Workout Duration: {elapsedTime} seconds
        </Text>
        <Button onPress={handleEndWorkout} size="large">
          Update Progress
        </Button>
      </Layout>
    </Screen>
  );
};

export default EndWorkout;
