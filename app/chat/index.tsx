import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from "react-native-gifted-chat";
import moment from "moment";

export default function ChatScreen() {
  const param = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    getUserDetails();

    const unsubscribe = onSnapshot(
      collection(db, "Inbox", param?.chatID as string, "Messages"),
      (doc) => {
        const res = doc.docs.map((x) => ({ _id: x.id, ...x.data() }));
        setMessages(res);
      }
    );

    return () => unsubscribe();
  }, []);

  const onSend = async (newMessages: any = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    newMessages[0].createdAt = moment().format("MM-DD-YYY hh:mm:ss");
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
