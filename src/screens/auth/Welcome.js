import React from "react";
import { ScrollView, Image, Linking } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import Screen from "../../components/Screen";

export default function ({ navigation }) {
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
              height: 320,
              width: 220,
            }}
            source={require("../../../assets/images/1.jpg")}
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
            Welcome to Lean Fitness
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 10,
            }}
            category="label"
          >
            Get lean & healthy with workouts & diet plans in Lean Fitness app!
          </Text>

          <Button
            size="large"
            style={{
              marginTop: 20,
              marginHorizontal: 10,
            }}
            onPress={() => {
              navigation.navigate("Details");
            }}
          >
            Get Started
          </Button>

          <Layout
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Button
              onPress={() => {
                navigation.navigate("Login");
              }}
              appearance="ghost"
              status="primary"
            >
              <Text size="md">Have an account? </Text>
              Login here
            </Button>
          </Layout>
          <Layout
            style={{
              bottom: 10,
              position: "absolute",
              alignSelf: "center",
            }}
          >
            <Button
              onPress={() => {
                Linking.openURL(
                  "https://github.com/kushendesilva/lean-fitness"
                );
              }}
              appearance="ghost"
              status="primary"
            >
              <Text size="md">Terms & Conditions Apply</Text>
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
    </Screen>
  );
}
