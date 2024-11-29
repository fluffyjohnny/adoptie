import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "@/components/Inbox/UserItem";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && getUserList();
  }, [user]);

  const getUserList = async () => {
    setUserList([]); // reset list
    setLoader(true);
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
    setLoader(false);
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
        ...otherUser,
      };

      list.push(res);
    });

    console.log(list);
    return list;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      <FlatList
        style={styles.list}
        onRefresh={getUserList}
        refreshing={loader}
        data={mapOtherUserList()}
        renderItem={({ item, index }) => (
          <UserItem userInfo={item} key={index} />
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
  list: {
    marginTop: 20,
    height: 100,
  },
});
