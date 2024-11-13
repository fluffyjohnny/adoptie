import { View, StyleSheet, Image, Text } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function PetSubInfo({ pet }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.outerContainer}>
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
        {/* <View style={styles.innerContainer}>
          <Image
            source={require("./../../assets/images/calendar.png")}
            style={styles.calendar}
          />
          <View>
            <Text style={styles.age}>Age</Text>
            <Text style={styles.ageNumber}>{pet?.age} YRS</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  outerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
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
