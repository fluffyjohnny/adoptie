import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PetOwnerInfo({ pet }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.ownerInfo}>
          <Image source={{ uri: pet?.ownerUrl }} style={styles.image} />
          <View>
            <Text style={styles.title}>{pet?.ownerName}</Text>
            <Text style={styles.subtitle}>Pet Owner</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="send-sharp" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ownerInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
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
