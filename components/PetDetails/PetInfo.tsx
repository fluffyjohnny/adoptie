import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SetFavorite from "./SetFavorite";

export default function PetInfo({ pet }: any) {
  return (
    <View>
      <Image source={{ uri: pet?.url }} style={styles.image}></Image>
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>{pet?.name}</Text>
        </View>
        <SetFavorite pet={pet} />
      </View>
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
});
