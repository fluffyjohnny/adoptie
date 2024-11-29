import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState<any[]>([]);

  useEffect(() => {
    user && getUserList();
  }, [user]);

  const getUserList = async () => {
    const q = query(
      collection(db, "Inbox"),
      where(
        "userIds",
        "array-contains",
        user?.primaryEmailAddress?.emailAddress
      )
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserList((x) => [...x, doc.data()]);
    });
  };

  const mapOtherUserList = () => {
    const list: { docId: string; email: string }[] = [];

    userList.forEach((x) => {
      const otherUser = x.users.filter(
        (x: { email: string }) =>
          x.email !== user?.primaryEmailAddress?.emailAddress
      )[0];
      const res = {
        docId: x.id,
        ...otherUser[0],
      };

      list.push(res);
    });

    return list;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      <FlatList
        data={mapOtherUserList()}
        renderItem={(x) => (
          <View>
            <Text>{x.docId}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
    height: "100%",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
});
