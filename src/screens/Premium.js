import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import {
  Icon,
  Text,
  Button,
  Card,
  ListItem,
  Divider,
} from "@ui-kitten/components";
import Screen from "../components/Screen";
import { getAuth } from "firebase/auth";
import {
  query,
  collection,
  getDocs,
  getDoc,
  doc,
  getFirestore,
} from "firebase/firestore/lite";

const Premium = ({ navigation }) => {
  const auth = getAuth();
  const db = getFirestore();

  const [list, setList] = useState([]);
  const [user, setUser] = useState({
    premium: false,
    role: "regular",
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getNote();
    getList();
    onRefresh();
  }, []);

  const getList = async () => {
    const q = query(collection(db, "chat"));
    const querySnapshot = await getDocs(q);
    setList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setRefreshing(false);
    if (querySnapshot.empty) {
      setList(null);
    }
  };

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
    await getList();
    setRefreshing(false);
  };

  const handleSubscribe = () => {
    navigation.navigate("BuyPremium", { id: auth.currentUser.uid });
  };

  const handleChat = () => {
    navigation.navigate("ChatScreen", {
      userRef: auth.currentUser.uid,
      role: user.role,
      uid: auth.currentUser.uid,
      displayName: user.name,
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/lean-fitness-app.appspot.com/o/avatar.png?alt=media&token=f4f3026c-d6f3-4f80-9d29-341f97f34f63",
    });
  };

  const renderItemAccessory = (props, id) => (
    <Button
      size="tiny"
      onPress={() =>
        navigation.navigate("ChatScreen", {
          userRef: id,
          role: user.role,
          uid: auth.currentUser.uid,
          displayName: user.name,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/lean-fitness-app.appspot.com/o/avatar.png?alt=media&token=f4f3026c-d6f3-4f80-9d29-341f97f34f63",
        })
      }
    >
      Message
    </Button>
  );

  const renderItemIcon = (props) => <Icon {...props} name="person-outline" />;

  return (
    <Screen headerTitle={"Premium Features"}>
      {user.role == "instructor" ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              style={{ marginHorizontal: 10 }}
              title={item.user}
              description={"Last Updated: " + item.updated}
              accessoryLeft={renderItemIcon}
              accessoryRight={() => renderItemAccessory({}, item.id)}
              ItemSeparatorComponent={Divider}
            />
          )}
        />
      ) : (
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
                  Congratulations on upgrading to Lean Fitness Premium! With
                  your subscription, you now have exclusive access to our team
                  of certified instructors who are ready to provide personalized
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
                  Upgrade to Lean Fitness Premium and get exclusive access to
                  our team of certified instructors for personalized
                  instructions via in-app chat.
                </Text>
                <Button size="large" onPress={handleSubscribe}>
                  Subscribe Now
                </Button>
              </>
            )}
          </Card>
        </ScrollView>
      )}
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
