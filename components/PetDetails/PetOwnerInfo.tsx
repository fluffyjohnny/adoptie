import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function PetOwnerInfo({ pet }: any) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: pet?.ownerUrl }} style={styles.image} />
      <View>
        <Text style={styles.title}>{pet?.ownerName}</Text>
        <Text style={styles.subtitle}>Pet Owner</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 15,
  },
  subtitle: {
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.GRAY,
  },
  image: {
    width: 50,
    height: 50,
    objectFit: "cover" as "cover",
    borderRadius: 50,
  },
});
