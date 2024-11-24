import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { getFavoriteList } from "@/shared/Shared";

export default function Favorite() {
  const { user } = useUser();

  useEffect(() => {
    user && getFavoriteID();
  }, [user]);

  const getFavoriteID = async () => {
    const res = getFavoriteList(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorite</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "outfit-bold",
  },
});
