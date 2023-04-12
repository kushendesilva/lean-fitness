import React from "react";
import { Image } from "react-native";
import { Text, Button, Layout } from "@ui-kitten/components";
import Screen from "../components/Screen";

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
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"New Regular Workout"}
    >
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
            source={require("../../assets/images/3.jpg")}
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
          New Regular Workout
        </Text>
        <Button size="large" onPress={handleStartWorkout}>
          Start Workout
        </Button>
      </Layout>
    </Screen>
  );
};

export default NewWorkout;
