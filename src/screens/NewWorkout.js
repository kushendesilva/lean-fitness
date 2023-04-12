import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const NewWorkout = ({ navigation, route }) => {
  const { weight, type, uid } = route.params;
  const handleStartWorkout = () => {
    navigation.navigate("Exercise", {
      weight,
      type,
      uid,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Workout</Text>
      {/* Display confirmation message or any other content */}
      <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
        <Text style={styles.startButtonText}>Start Workout</Text>
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
  startButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default NewWorkout;
