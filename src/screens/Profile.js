import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
  getDocs,
} from "firebase/firestore/lite";
import { Layout, Text, Button, Icon } from "@ui-kitten/components";
import { ScrollView, RefreshControl } from "react-native";
import Screen from "../components/Screen";
import { ProfileCard } from "../components/ProfileCard";
import { Calendar } from "react-native-calendars";

export default function ({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();

  const [user, setUser] = useState({ name: "", weight: "", age: "" });
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    getNote();
    getList();
    onRefresh();
  }, []);

  const getList = async () => {
    const q = query(
      collection(db, "workouts"),
      where("uid", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    const workoutList = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setList(workoutList);
    setRefreshing(false);

    // Mark dates on the calendar
    const markedDatesObj = {};
    workoutList.forEach((workout) => {
      let date;
      if (workout.createdAt instanceof Date) {
        date = new Date(workout.createdAt.getTime() + 5.5 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
      } else if (
        workout.createdAt &&
        workout.createdAt.hasOwnProperty("seconds")
      ) {
        date = new Date(workout.createdAt.seconds * 1000 + 5.5 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
      }
      if (date) {
        // Update the markedDatesObj based on the "type" field
        const markedColor = workout.type === "regular" ? "blue" : "red";
        markedDatesObj[date] = { marked: true, dotColor: markedColor };
      }
    });
    setMarkedDates(markedDatesObj);
  };

  const getNote = async () => {
    const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (docSnap.exists()) {
      const userData = docSnap.data();
      setUser(userData);
    } else {
      const userData = { name: "", weight: "", age: "" };
      setUser(userData);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getNote();
    await getList();
    setRefreshing(false);
  };

  return (
    <Screen headerTitle="Your Profile">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileCard
          email={auth.currentUser.email}
          onPress={() => {
            signOut(auth);
          }}
          onEditPress={() =>
            navigation.navigate("ProfileEdit", {
              user: {
                name: user.name,
                weight: user.weight,
                email: auth.currentUser.email,
                id: auth.currentUser.uid,
                age: user.age,
                type: user.type,
              },
            })
          }
          name={user.name}
          age={user.age}
          weight={user.weight}
        />

        <Text
          category="h5"
          style={{ marginTop: 20, textAlign: "center", fontWeight: "bold" }}
        >
          Workout Progress
        </Text>
        <Calendar markedDates={markedDates} />
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <Button
            onPress={() =>
              navigation.navigate("Logs", {
                user: {
                  name: user.name,
                  weight: user.weight,
                  email: auth.currentUser.email,
                  id: auth.currentUser.uid,
                  age: user.age,
                },
              })
            }
          >
            Workout Logs
          </Button>
          <Layout
            style={{
              justifyContent: "center",
            }}
          >
            <Layout
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text
                category="label"
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Regular Workouts:
              </Text>
              <Icon
                style={{ height: 15, width: 15, marginLeft: 5 }}
                fill="blue"
                name="radio-button-on"
              />
            </Layout>
            <Layout
              style={{
                marginTop: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text
                category="label"
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Specialized Workouts:
              </Text>
              <Icon
                style={{ height: 15, width: 15, marginLeft: 5 }}
                fill="red"
                name="radio-button-on"
              />
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </Screen>
  );
}
