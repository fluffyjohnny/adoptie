import { View, StyleSheet } from "react-native";
import React from "react";
import Header from "../../components/Home/header";
import Slider from "../../components/Home/slider";
import PetListCategory from "@/components/Home/petListCategory";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <Slider />
      <PetListCategory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
