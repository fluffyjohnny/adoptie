import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../../components/Home/header";
import Slider from "../../components/Home/slider";
import PetListCategory from "@/components/Home/petListCategory";
import Colors from "@/constants/Colors";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header />
        <Slider />
        <PetListCategory />
      </View>
      <TouchableOpacity style={styles.addPetBtn}>
        <Text>Add New Pet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  addPetBtn: {
    backgroundColor: Colors.SECONDARY,
    fontFamily: "outfit-bold",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
