import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Screen from "../components/Screen";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);

  // Extract user data from route params
  const { uid, displayName, photoURL } = route.params;

  useEffect(() => {
    // Fetch initial messages from Firebase Firestore
    const firestore = getFirestore();
    const chatRef = doc(firestore, "chat", "Cn30HpE1yHOPj2K0vGNYLCIinIe2");
    const messagesRef = collection(chatRef, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {
          ...data,
          _id: id,
          createdAt: data.createdAt ? data.createdAt.toDate() : null, // Add null check for createdAt field
        };
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (newMessages) => {
    // Add new message to Firebase Firestore
    const text = newMessages[0].text;
    const createdAt = serverTimestamp(); // Use Firestore server timestamp
    const message = {
      text,
      createdAt,
      user: { _id: uid, displayName, avatar: photoURL }, // Add avatar property
    };
    const firestore = getFirestore();
    const chatRef = doc(firestore, "chat", "Cn30HpE1yHOPj2K0vGNYLCIinIe2");
    await addDoc(collection(chatRef, "messages"), message);
  };

  return (
    <Screen
      backAction={() => {
        navigation.goBack();
      }}
      headerTitle={"Chat with Instructor"}
      style={{ paddingBottom: 20 }}
    >
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: uid, displayName, photoURL }}
      />
    </Screen>
  );
};

export default ChatScreen;
