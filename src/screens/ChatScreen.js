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
  updateDoc,
} from "firebase/firestore";
import Screen from "../components/Screen";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);

  // Extract user data from route params
  const { uid, displayName, photoURL, role, userRef } = route.params;

  useEffect(() => {
    // Fetch initial messages from Firebase Firestore
    const firestore = getFirestore();
    const chatRef = doc(firestore, "chat", userRef);
    const messagesRef = collection(chatRef, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const filteredMessages = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {
            ...data,
            _id: id,
            createdAt: data.createdAt ? data.createdAt.toDate() : null,
          };
        })
        .filter((message) => {
          // Filter messages based on user's role
          if (role === "instructor") {
            // If user is an instructor, show all messages
            return true;
          } else if (role === "regular") {
            // If user is a regular user, show messages from instructors only
            return (
              message.user.role === "instructor" || message.user._id === uid
            );
          } else {
            // For other roles, show only user's own messages
            return message.user._id === uid;
          }
        });
      setMessages(filteredMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (newMessages) => {
    // Add new message to Firebase Firestore
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeString = `${currentHour}:${currentMinute}`;
    const text = newMessages[0].text;
    const createdAt = serverTimestamp(); // Use Firestore server timestamp
    const message = {
      text,
      createdAt,
      user: { _id: uid, displayName, avatar: photoURL, role }, // Add avatar property
    };
    const firestore = getFirestore();
    const chatRef = doc(firestore, "chat", userRef);
    await addDoc(collection(chatRef, "messages"), message);
    {
      role === "instructor"
        ? await updateDoc(chatRef, {
            updated: currentTimeString,
          })
        : await updateDoc(chatRef, {
            user: displayName,
            updated: currentTimeString,
          });
    }
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
