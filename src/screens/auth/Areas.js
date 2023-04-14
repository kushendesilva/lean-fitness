import React, { useState } from "react";
import { ScrollView, Image } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
import Screen from "../../components/Screen";
import { AreaCard } from "../../components/AreaCard";

export default function ({ navigation, route }) {
  const [selectedButtons, setSelectedButtons] = useState({});

  const { name, age, weight, type } = route.params;

  const handleButtonPress = (value, isSelected) => {
    // Update the selected buttons object based on the value and isSelected status,
    // excluding keys with false values
    setSelectedButtons((prevSelectedButtons) => {
      if (!isSelected) {
        // If isSelected is false, remove the key from the object
        const { [value]: _, ...updatedButtons } = prevSelectedButtons;
        return updatedButtons;
      } else {
        // If isSelected is true, update the key-value pair in the object
        return {
          ...prevSelectedButtons,
          [value]: isSelected,
        };
      }
    });
  };

  const navigateToNextPage = () => {
    navigation.navigate("Register", {
      selectedButtons,
      name,
      age,
      weight,
      type,
    });
  };

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Target Muscles"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Layout
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 50,
            }}
            category="h5"
          >
            Choose Your Target Muscles
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 20,
            }}
            category="label"
          >
            Focused muscle targeting for effective workouts. Train with
            precision
          </Text>
          <Layout
            style={{
              justifyContent: "center",
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 500,
                width: 320,
                alignSelf: "center",
              }}
              source={require("../../../assets/images/4.jpg")}
            />
            <Layout
              style={{
                position: "absolute",
                top: 130,
                left: 40,
                backgroundColor: "rgba(0, 0, 0, 0)",
              }}
            >
              <AreaCard
                title="Chest"
                onPress={() =>
                  handleButtonPress("Chest", !selectedButtons["Chest"])
                }
              />
            </Layout>
            <Layout
              style={{
                position: "absolute",
                top: 200,
                left: 40,
                backgroundColor: "rgba(0, 0, 0, 0)",
              }}
            >
              <AreaCard
                title="Abs"
                onPress={() =>
                  handleButtonPress("Abs", !selectedButtons["Abs"])
                }
              />
            </Layout>
            <Layout
              style={{
                position: "absolute",
                right: 10,
                top: 120,
                backgroundColor: "rgba(0, 0, 0, 0)",
              }}
            >
              <AreaCard
                title="Upper Arm"
                onPress={() =>
                  handleButtonPress(
                    "Upper Arms",
                    !selectedButtons["Upper Arms"]
                  )
                }
              />
            </Layout>
            <Layout
              style={{
                position: "absolute",
                right: 20,
                top: 190,
                backgroundColor: "rgba(0, 0, 0, 0)",
              }}
            >
              <AreaCard
                title="Lower Arm"
                onPress={() =>
                  handleButtonPress(
                    "Lower Arms",
                    !selectedButtons["Lower Arms"]
                  )
                }
              />
            </Layout>
            <Layout
              style={{
                position: "absolute",
                left: 60,
                bottom: 160,
                backgroundColor: "rgba(0, 0, 0, 0)",
              }}
            >
              <AreaCard
                title="Upper Leg"
                onPress={() =>
                  handleButtonPress(
                    "Upper Legs",
                    !selectedButtons["Upper Legs"]
                  )
                }
              />
            </Layout>
            <Layout
              style={{
                position: "absolute",
                bottom: 75,
                right: 50,
                backgroundColor: "rgba(0, 0, 0, 0)",
              }}
            >
              <AreaCard
                title="Lower Leg"
                onPress={() =>
                  handleButtonPress(
                    "Lower Legs",
                    !selectedButtons["Lower Legs"]
                  )
                }
              />
            </Layout>
          </Layout>

          <Button
            size="large"
            style={{
              marginTop: 30,
              marginHorizontal: 20,
              marginBottom: 20,
            }}
            onPress={navigateToNextPage}
            disabled={!Object.values(selectedButtons).includes(true)}
          >
            Next
          </Button>
        </Layout>
      </ScrollView>
    </Screen>
  );
}
