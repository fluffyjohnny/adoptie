import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";

export default function ChatScreen() {
  const param = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const onSend = async (newMessages: any = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    await addDoc(
      collection(db, "Inbox", param?.chatID as string, "Messages"),
      newMessages[0]
    );
  };

  const getUserDetails = async () => {
    const docRef = doc(db, "Inbox", param?.chatID as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const res = docSnap.data();
      const otherUser = res?.users.filter(
        (x: { email: string }) =>
          x.email !== user?.primaryEmailAddress?.emailAddress
      )[0];

      navigation.setOptions({
        headerTitle: otherUser?.name,
      });
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(x) => onSend(x)}
      showAvatarForEveryMessage={true}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress || 0,
        name: user?.fullName || undefined,
        avatar: user?.imageUrl,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 15,
  },
});
