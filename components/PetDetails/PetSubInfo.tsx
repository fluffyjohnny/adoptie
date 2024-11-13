import { View, StyleSheet, Image, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <PetSubInfoCard pet={pet} />
        <PetSubInfoCard pet={pet} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
