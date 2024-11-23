import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";

export default function Favorite() {
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
    fontSize: 21,
    fontWeight: "bold",
    fontFamily: "outfit-bold",
  },
});
