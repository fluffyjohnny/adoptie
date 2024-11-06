import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface PetListItemProps {
  pet: any;
}

export default function PetListItem({ pet }: PetListItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: pet?.url }} style={styles.image} />
      <Text style={styles.name}>{pet?.name}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.breed}>{pet?.breed}</Text>
        <Text style={styles.age}>{pet?.age} YRS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    padding: 15,
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: "100%",
    height: 90,
    objectFit: "cover" as "cover",
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    marginTop: 5,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center" as "center",
    marginTop: 5,
  },
  breed: {
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.GRAY,
    maxWidth: "50%",
    overflow: "hidden",
  },
  age: {
    fontFamily: "outfit",
    fontSize: 11,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: Colors.SECONDARY,
  },
});
