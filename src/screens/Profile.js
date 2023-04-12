import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore/lite";
import { ScrollView, RefreshControl } from "react-native"; // Import RefreshControl from react-native library
import Screen from "../components/Screen";
import { ProfileCard } from "../components/ProfileCard";
import { NavButton } from "../components/NavButton";

export default function ({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();

  const [user, setUser] = useState({ name: "", weight: "", age: "" });
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
      const userData = { name: "", weight: "", age: "" };
      setUser(userData);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getNote();
    setRefreshing(false);
  };

  return (
    <Screen headerTitle="Profile">
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
              },
            })
          }
          name={user.name}
          age={user.age}
          weight={user.weight}
        />

        <NavButton
          icon="credit-card"
          title="Payment Methods"
          onPress={() => {
            navigation.navigate("PaymentMethods");
          }}
        />
        <NavButton
          icon="question-mark-circle"
          title="Help"
          onPress={() => {
            navigation.navigate("Help");
          }}
        />
      </ScrollView>
    </Screen>
  );
}
