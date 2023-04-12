import React from "react";
import { StyleSheet } from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";
import Screen from "../components/Screen";
import dietPlans from "../../assets/diet.json";

const DietPlan = ({ navigation, route }) => {
  weight = "50";
  let selectedDietPlan;
  if (weight < 60) {
    selectedDietPlan = dietPlans.low;
  } else if (weight >= 60 && weight <= 120) {
    selectedDietPlan = dietPlans.mid;
  } else {
    selectedDietPlan = dietPlans.high;
  }

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={`Diet Plan for ${selectedDietPlan.weight_class} Weight Class`}
    >
      <Layout style={{ paddingHorizontal: 15 }}>
        {Object.keys(selectedDietPlan.days).map((day, index) => (
          <Card key={index} style={styles.card}>
            <Text category="h5" style={styles.dayTitle}>{`${day}:`}</Text>
            {selectedDietPlan.days[day].map((meal, mealIndex) => (
              <Text
                category="p1"
                key={mealIndex}
                style={styles.meal}
              >{`${meal}`}</Text>
            ))}
          </Card>
        ))}
      </Layout>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  dayTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  meal: {
    marginBottom: 4,
  },
});

export default DietPlan;
