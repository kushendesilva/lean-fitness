import React from "react";
import { ScrollView, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import Screen from "../../components/Screen";
import { NewCard } from "../../components/NewCard";

export default function ({ navigation, route }) {
  const { name, age, weight } = route.params;

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Workout Type"}
    >
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
              height: 220,
              width: 220,
            }}
            source={require("../../../assets/images/6.jpg")}
          />
        </Layout>
        <Layout
          style={{
            flex: 3,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 10,
            }}
            category="h5"
          >
            Choose a Workout Type
          </Text>
          <NewCard
            title="Gain Muscle"
            description="Build a powerful, toned physique with our muscle-gaining workouts! Sculpt your body, increase strength, and achieve the muscular physique you've always desired."
            onPress={() => {
              navigation.navigate("Areas", { name, weight, age, type: "1" });
            }}
          />
          <NewCard
            title="Lose Weight"
            description="Shed unwanted pounds and get fit with our weight-loss workouts! Burn calories, boost metabolism, and achieve your weight loss goals with our effective and engaging exercise routines."
            onPress={() => {
              navigation.navigate("Areas", { name, weight, age, type: "2" });
            }}
          />
        </Layout>
      </ScrollView>
    </Screen>
  );
}
