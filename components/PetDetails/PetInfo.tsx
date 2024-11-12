import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PetInfo({ pet }: any) {
  return (
    <View>
      <Image source={{ uri: pet?.url }} style={styles.image}></Image>
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>{pet?.name}</Text>
          <Text style={styles.breed}>{pet?.breed}</Text>
        </View>
        <Ionicons name="heart-outline" size={20} />
      </View>
      <Text style={styles.about}>{pet?.about}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    objectFit: "cover" as "cover",
  },
  container: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontFamily: "outfit-bold",
    fontSize: 27,
  },
  breed: {
    fontFamily: "outfit-regular",
    fontSize: 16,
  },
  about: {
    fontFamily: "outfit-regular",
    fontSize: 16,
    marginTop: 10,
  },
});
