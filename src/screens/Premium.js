import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, RefreshControl } from "react-native";
import { Icon, Text, Button, Card } from "@ui-kitten/components";
import Screen from "../components/Screen";
import { getAuth } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore/lite";

const Premium = ({ navigation }) => {
  const auth = getAuth();
  const db = getFirestore();

  const [user, setUser] = useState({
    premium: false,
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
      const userData = { premium: false };
      setUser(userData);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getNote();
    setRefreshing(false);
  };

  const handleSubscribe = () => {
    navigation.navigate("BuyPremium", { id: auth.currentUser.uid });
  };

  const handleChat = () => {
    navigation.navigate("ChatScreen", {
      role: user.role,
      uid: auth.currentUser.uid,
      displayName: user.name,
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/lean-fitness-ravindu.appspot.com/o/avatar.png?alt=media&token=bc40eb09-8f27-47dc-9bd2-7c0d6371d398",
    });
  };

  return (
    <Screen headerTitle={"Premium"}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Card style={styles.container}>
          <Image
            resizeMode="contain"
            style={{
              height: 150,
              marginVertical: 20,
              alignSelf: "center",
            }}
            source={require("../../assets/logo-sm.png")}
          />

          {user.premium ? (
            <>
              <Icon
                style={{ alignSelf: "center" }}
                name="star"
                width={32}
                height={32}
                fill="#8F9BB3"
              />
              <Text style={styles.title}>You Are a Premium Member</Text>
              <Text style={styles.description}>
                Congratulations on upgrading to Lean Fitness Premium! With your
                subscription, you now have exclusive access to our team of
                certified instructors who are ready to provide personalized
                instructions and guidance via in-app chat.
              </Text>
              <Button size="large" onPress={handleChat}>
                Chat With Instructor
              </Button>
            </>
          ) : (
            <>
              <Icon
                style={{ alignSelf: "center" }}
                name="unlock"
                width={32}
                height={32}
                fill="#8F9BB3"
              />
              <Text style={styles.title}>Unlock Premium Benefits!</Text>
              <Text style={styles.description}>
                Upgrade to Lean Fitness Premium and get exclusive access to our
                team of certified instructors for personalized instructions via
                in-app chat.
              </Text>
              <Button size="large" onPress={handleSubscribe}>
                Subscribe Now
              </Button>
            </>
          )}
        </Card>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A3F44",
    marginVertical: 8,
    alignSelf: "center",
  },
  description: {
    textAlign: "center",
    color: "#8F9BB3",
    marginVertical: 16,
  },
});

export default Premium;
