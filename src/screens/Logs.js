import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import {
  query,
  where,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { Icon, ListItem, Button } from "@ui-kitten/components";
import Screen from "../components/Screen";

export default function ({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();

  const [refreshing, setRefreshing] = useState(true);

  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const q = query(
      collection(db, "workouts"),
      where("uid", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    setList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setRefreshing(false);
    if (querySnapshot.empty) {
      setList(null);
    }
  };

  const renderItemAccessory = (props, elapsedTime) => (
    <Button size="tiny">{`${elapsedTime} Seconds`}</Button>
  );

  const renderItemIcon = (props) => (
    <Icon {...props} name="clipboard-outline" />
  );

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle="Workout Logs"
    >
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getList} />
        }
        data={list}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <ListItem
            title={`${item.createdAt.toDate()}`}
            description={`${
              item.type.charAt(0).toUpperCase() + item.type.slice(1)
            } Workout`}
            accessoryLeft={renderItemIcon}
            accessoryRight={() => renderItemAccessory({}, item.elapsedTime)}
          />
        )}
      />
    </Screen>
  );
}
