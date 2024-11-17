import { View, StyleSheet } from "react-native";
import React from "react";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <PetSubInfoCard
          icon={require("./../../assets/images/calendar.png")}
          title={"Age"}
          value={(pet?.age ?? 0) + " YRS"}
        />
        <PetSubInfoCard
          icon={require("./../../assets/images/bone.png")}
          title={"Breed"}
          value={pet?.breed ?? "Unknown"}
        />
      </View>
      <View style={styles.innerContainer}>
        <PetSubInfoCard
          icon={require("./../../assets/images/sex.png")}
          title={"Sex"}
          value={pet?.sex ?? "Unknown"}
        />
        <PetSubInfoCard
          icon={require("./../../assets/images/weight.png")}
          title={"Weight"}
          value={(pet?.weight ?? 0) + " LB"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
