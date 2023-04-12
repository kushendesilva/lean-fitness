import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore/lite";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  RefreshControl,
} from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import Screen from "../components/Screen";

export default function ({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();

  const [user, setUser] = useState({
    name: "",
    weight: "",
    age: "",
    areas: {},
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getNote();
  }, []);

  const getNote = async () => {
    const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (docSnap.exists()) {
      const userData = docSnap.data();
      setUser(userData);
    } else {
      const userData = { name: "", weight: "", age: "", areas: {} };
      setUser(userData);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getNote();
    setRefreshing(false);
  };

  const areas = user.areas;
  const renderItem = ({ item }) => {
    if (areas[item] === true) {
      return (
        <TouchableNativeFeedback
          onPress={() =>
            navigation.navigate("ExerciseArea", {
              area: item,
            })
          }
        >
          <Layout style={styles.cardSmall}>
            <ImageBackground
              style={styles.imageSmall}
              source={require("../../assets/exercises/Abs.jpg")}
            >
              <Layout style={styles.titleContainerSmall}>
                <Text category="h6" style={styles.titleSmall}>
                  {item}
                </Text>
              </Layout>
            </ImageBackground>
          </Layout>
        </TouchableNativeFeedback>
      );
    }
    return null;
  };

  return (
    <Screen headerTitle="Workout">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Layout
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate("Exercise", {
                type: user.type,
                weight: user.weight,
              })
            }
          >
            <Layout style={styles.card}>
              <ImageBackground
                style={styles.image}
                source={require("../../assets/exercises/workout.jpg")}
              >
                <Layout style={styles.titleContainer}>
                  <Text category="h6" style={styles.title}>
                    Start Workout
                  </Text>
                </Layout>
              </ImageBackground>
            </Layout>
          </TouchableNativeFeedback>
        </Layout>
        <Layout
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 20 }} category="h6">
            Specialized Areas
          </Text>
          <FlatList
            horizontal
            data={Object.keys(areas)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </Layout>
        <Layout
          style={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate("DietPlan", {
                weight: user.weight,
              })
            }
          >
            <Layout style={styles.card}>
              <ImageBackground
                style={styles.image}
                source={require("../../assets/exercises/diet.jpg")}
              >
                <Layout style={styles.titleContainer}>
                  <Text category="h6" style={styles.title}>
                    Diet plan
                  </Text>
                </Layout>
              </ImageBackground>
            </Layout>
          </TouchableNativeFeedback>
        </Layout>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    height: 200,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)", // Add an overlay to the image
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
  },
  title: {
    color: "white",
    textAlign: "center",
  },
  cardSmall: {
    width: 150, // Set the width to fit two items in one screen
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 8, // Add margin to separate the items
  },
  imageSmall: {
    height: 150,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleContainerSmall: {
    backgroundColor: "rgba(0,0,0,0.5)", // Add an overlay to the image
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
  },
  titleSmall: {
    color: "white",
    textAlign: "center",
  },
});
