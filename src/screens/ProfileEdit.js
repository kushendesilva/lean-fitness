import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { updateDoc, doc, getFirestore } from "firebase/firestore/lite";
import { Picker } from "react-native";
import {
  Input,
  Button,
  Icon,
  Layout,
  Text,
  useTheme,
} from "@ui-kitten/components";
import RenderIf from "../configs/RenderIf";
import Screen from "../components/Screen";

export default function ({ navigation, route }) {
  const { user } = route.params;
  const auth = getAuth();
  const db = getFirestore();
  const theme = useTheme();
  const [name, setName] = useState(user.name);
  const [weight, setWeight] = useState(user.weight);
  const [visibility, setVisibility] = useState(true);
  const [selectedValue, setSelectedValue] = useState(user.type);

  const onSelect = (itemValue) => {
    setSelectedValue(itemValue);
  };

  const EditIcon = (props) => <Icon {...props} name="edit-2-outline" />;
  const CancelIcon = (props) => <Icon {...props} name="slash-outline" />;
  const SaveIcon = (props) => <Icon {...props} name="save-outline" />;

  async function reset() {
    await sendPasswordResetEmail(auth, user.email)
      .then(function () {
        navigation.goBack();
        alert("Your password reset link has been sent to your email");
      })
      .catch(function (error) {
        alert(error);
      });
  }

  const updateUser = async () => {
    const testDocRef = doc(db, "users", user.id);
    await updateDoc(testDocRef, {
      name,
      weight,
      type: selectedValue,
    });
  };

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Personal Information"}
    >
      <Layout style={{ padding: 10 }}>
        <Input
          style={{ marginHorizontal: "2%", marginVertical: "1%" }}
          size="large"
          status="primary"
          value={name}
          label="Name"
          placeholder="Change Your Name"
          onChangeText={(nextValue) => setName(nextValue)}
          disabled={visibility}
        />
        <Input
          keyboardType="number-pad"
          style={{ marginHorizontal: "2%", marginVertical: "1%" }}
          size="large"
          status="primary"
          value={weight}
          label="Weight"
          placeholder="Change Your Weight"
          onChangeText={(nextValue) => setWeight(nextValue)}
          disabled={visibility}
        />
        <Text
          style={{ marginHorizontal: "2%", marginVertical: "1%" }}
          category="label"
          appearance="hint"
        >
          Workout Type
        </Text>
        <Layout
          style={{
            marginHorizontal: "2%",
            marginVertical: "1%",
            borderColor: visibility
              ? theme["color-primary-200"]
              : theme["color-primary-500"],
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <Picker
            enabled={!visibility}
            selectedValue={selectedValue}
            onValueChange={onSelect}
          >
            <Picker.Item label="Gain Muscles" value="1" />
            <Picker.Item label="Lose Weight" value="2" />
          </Picker>
        </Layout>
        <Input
          style={{ marginHorizontal: "2%", marginVertical: "1%" }}
          size="large"
          status="primary"
          value={user.age}
          label="Age"
          disabled={true}
        />

        <Input
          style={{ marginHorizontal: "2%", marginVertical: "1%" }}
          size="large"
          status="primary"
          value={user.email}
          label="Email"
          disabled={true}
        />

        {RenderIf(
          visibility,
          <Button
            accessoryRight={EditIcon}
            style={{ alignSelf: "center", marginTop: "2%" }}
            status="warning"
            size="giant"
            onPress={() => {
              setVisibility(!visibility);
            }}
          >
            Change
          </Button>
        )}

        {RenderIf(
          !visibility,
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: "2%",
            }}
          >
            <Button
              accessoryRight={CancelIcon}
              status="danger"
              size="giant"
              onPress={() => {
                setVisibility(!visibility);
              }}
            >
              Cancel
            </Button>
            <Button
              accessoryRight={SaveIcon}
              status="success"
              size="giant"
              onPress={() => {
                setVisibility(!visibility);
                updateUser();
                navigation.goBack();
              }}
            >
              Update
            </Button>
          </Layout>
        )}
        <Button
          style={{ alignSelf: "center", marginTop: 20, width: "95%" }}
          disabled={visibility}
          size="giant"
          onPress={() => {
            reset();
          }}
        >
          Reset Password
        </Button>
      </Layout>
    </Screen>
  );
}
