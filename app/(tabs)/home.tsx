import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Home/header";
import Slider from "../../components/Home/slider";
import PetListCategory from "@/components/Home/petListCategory";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Slider />
      <PetListCategory />
      <View>
        <Text>Add New Pet</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
