import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListCategory from "@/components/Home/PetListCategory";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header />
        <Slider />
        <PetListCategory />
      </View>
      <TouchableOpacity style={styles.addPetBtn}>
        <MaterialIcons name="add" size={24} color={Colors.BLACK} />
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
    backgroundColor: Colors.PRIMARY,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    fontFamily: "outfit-bold",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
