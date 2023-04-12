import React, { useState } from "react";
import { ScrollView, Image } from "react-native";
import {
  Button,
  Layout,
  Text,
  Icon,
  Input,
  ButtonGroup,
} from "@ui-kitten/components";
import Screen from "../../components/Screen";

export default function ({ navigation }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const NextIcon = (props) => (
    <Icon {...props} name="arrow-ios-forward-outline" />
  );

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Personal Details"}
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
            source={require("../../../assets/images/3.jpg")}
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
            Tell Us About Yourself
          </Text>
          <Input
            style={{ marginHorizontal: "2%", marginVertical: "1%" }}
            size="large"
            status="primary"
            value={name}
            label="Name"
            placeholder="Your Name"
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <Input
            style={{ marginHorizontal: "2%", marginVertical: "1%" }}
            size="large"
            status="primary"
            value={weight}
            label="Weight"
            keyboardType="decimal-pad"
            placeholder="Your Weight (kg)"
            onChangeText={(nextValue) => setWeight(nextValue)}
          />
          <Input
            style={{ marginHorizontal: "2%", marginVertical: "1%" }}
            size="large"
            status="primary"
            value={age}
            label="Age"
            keyboardType="decimal-pad"
            placeholder="Your Age"
            onChangeText={(nextValue) => setAge(nextValue)}
          />
          <Button
            size="large"
            style={{
              marginTop: 20,
              marginHorizontal: 10,
            }}
            accessoryRight={NextIcon}
            onPress={() => {
              if (name && weight && age) {
                if (age < 16) {
                  alert("You're not old enough.");
                } else {
                  navigation.navigate("Type", {
                    name,
                    weight,
                    age,
                  });
                }
              }
            }}
            disabled={!name || !weight || !age}
          >
            Next
          </Button>
        </Layout>
      </ScrollView>
    </Screen>
  );
}
