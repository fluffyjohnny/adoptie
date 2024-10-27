import { View, StyleSheet } from "react-native";
import React from "react";
import Header from "../../components/header";
import Slider from "../../components/slider";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <Slider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
