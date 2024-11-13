import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function PetSubInfoCard({ pet }: any) {
  return (
    <View style={styles.innerContainer}>
      <Image
        source={require("./../../assets/images/calendar.png")}
        style={styles.calendar}
      />
      <View>
        <Text style={styles.age}>Age</Text>
        <Text style={styles.ageNumber}>{pet?.age} YRS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.WHITE,
    margin: 5,
    borderRadius: 10,
    gap: 10,
    flex: 1,
  },
  calendar: {
    width: 20,
    height: 20,
  },
  age: {
    fontFamily: "outfit",
    fontSize: 16,
    color: Colors.GRAY,
  },
  ageNumber: {
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
});
