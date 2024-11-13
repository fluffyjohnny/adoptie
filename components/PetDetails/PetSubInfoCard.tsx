import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface PetSubInfoCardProps {
  icon: ImageSourcePropType;
  title: string;
  value: string;
}

export default function PetSubInfoCard({
  icon,
  title,
  value,
}: PetSubInfoCardProps) {
  return (
    <View style={styles.innerContainer}>
      <Image source={icon} style={styles.calendar} />
      <View>
        <Text style={styles.age}>{title}</Text>
        <Text style={styles.ageNumber}>{value}</Text>
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
    width: 30,
    height: 30,
  },
  age: {
    fontFamily: "outfit",
    fontSize: 16,
    color: Colors.GRAY,
  },
  ageNumber: {
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
});
