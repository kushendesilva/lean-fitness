import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore/lite"; // Import Firestore Lite

const EndWorkout = ({ navigation, route }) => {
  const handleEndWorkout = async () => {
    try {
      // Create a Firestore Lite instance
      const db = getFirestore();

      // Get the uid, elapsedTime, and type values from the route.params
      const { uid, elapsedTime, type } = route.params;

      // Check if uid is defined
      if (!uid) {
        console.error("uid is undefined");
        return;
      }

      // Create a document in the "workouts" collection in Firestore with the uid, elapsedTime, type, and current date values
      await addDoc(collection(db, "workouts"), {
        uid,
        elapsedTime,
        type,
        createdAt: serverTimestamp(),
      });

      // Navigate back to Home screen
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error adding workout to Firestore:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>End Workout</Text>
      {/* Display workout summary or any other content */}
      <TouchableOpacity style={styles.endButton} onPress={handleEndWorkout}>
        <Text style={styles.endButtonText}>End Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  endButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  endButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default EndWorkout;
