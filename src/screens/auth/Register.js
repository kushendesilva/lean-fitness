import React, { useState } from "react";
import { ScrollView, Image, TouchableWithoutFeedback } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore/lite";
import { Button, Layout, Text, Icon, Input } from "@ui-kitten/components";
import Screen from "../../components/Screen";

export default function ({ navigation, route }) {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const { selectedButtons, name, age, weight, type } = route.params;

  const onRegisterPress = async () => {
    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
        name,
        areas: selectedButtons,
        age,
        weight,
        type,
      };
      const usersRef = doc(db, "users", uid);
      await setDoc(usersRef, data);
    } catch (e) {
      setLoading(false);
      alert(e);
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Get Started"}
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
            source={require("../../../assets/images/5.jpg")}
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
            Complete Registration
          </Text>
          <Input
            style={{ marginHorizontal: "2%", marginVertical: "1%" }}
            size="large"
            status="primary"
            value={email}
            label="Email"
            placeholder="Your Email"
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
          <Input
            style={{ marginHorizontal: "2%", marginVertical: "1%" }}
            size="large"
            status="primary"
            value={password}
            label="Password"
            placeholder="Your Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
          <Button
            size="large"
            style={{
              marginTop: 20,
              marginHorizontal: 10,
            }}
            disabled={loading}
            onPress={onRegisterPress}
          >
            {loading ? "Loading" : "Ready to Workout"}
          </Button>
        </Layout>
      </ScrollView>
    </Screen>
  );
}
