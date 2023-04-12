import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, RefreshControl } from "react-native";
import { Icon, Text, Button, Layout } from "@ui-kitten/components";
import Screen from "../components/Screen";
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore/lite";

const Premium = ({ navigation }) => {
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

  const handleSubscribe = () => {
    navigation.navigate("BuyPremium");
  };

  return (
    <Screen headerTitle={"Premium"}>
      <ScrollView>
        <Layout style={styles.container}>
          <Image
            resizeMode="contain"
            style={{
              height: 250,
            }}
            source={require("../../assets/images/premium.png")}
          />
          <Icon name="unlock" width={32} height={32} fill="#8F9BB3" />
          <Text style={styles.title}>Unlock Premium Benefits!</Text>
          <Text style={styles.description}>
            Upgrade to Lean Fitness Premium and get exclusive access to our team
            of certified instructors for personalized instructions via in-app
            chat.
          </Text>
          <Button onPress={handleSubscribe}>Subscribe Now</Button>
        </Layout>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: "#F5F9FF",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A3F44",
    marginVertical: 8,
  },
  description: {
    textAlign: "center",
    color: "#8F9BB3",
    marginVertical: 16,
  },
});

export default Premium;
