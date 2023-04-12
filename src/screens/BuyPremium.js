import React, { useContext } from "react";
import { Layout, useTheme, Button } from "@ui-kitten/components";
import Screen from "../components/Screen";
import { CreditCardInput } from "react-native-credit-card-input-view";
import { ThemeContext } from "../configs/Theme";
import { updateDoc, doc, getFirestore } from "firebase/firestore/lite";

export default function ({ navigation, route }) {
  const { id } = route.params;
  const db = getFirestore();
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();

  const updateUser = async () => {
    const testDocRef = doc(db, "users", id);
    await updateDoc(testDocRef, { premium: true });
  };

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Buy Premium"}
    >
      <Layout style={{ marginTop: 80 }}>
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          cardScale={1.0}
          labelStyle={{
            color:
              themeContext.theme == "dark"
                ? theme["color-info-100"]
                : theme["color-info-default"],
            fontSize: 12,
          }}
          inputStyle={{
            fontSize: 16,
            color:
              themeContext.theme == "dark"
                ? theme["color-info-100"]
                : theme["color-info-default"],
          }}
          validColor={
            themeContext.theme == "dark"
              ? theme["color-info-100"]
              : theme["color-info-default"]
          }
          invalidColor={theme["color-danger-default"]}
          placeholderColor={theme["color-info-400"]}
        />
        <Button
          size="large"
          style={{ position: "absolute", alignSelf: "center", top: 250 }}
          onPress={() => {
            updateUser();
            navigation.goBack();
          }}
        >
          Subscribe
        </Button>
      </Layout>
    </Screen>
  );
}
