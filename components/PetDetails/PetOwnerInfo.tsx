import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function PetOwnerInfo({ pet }: any) {
  return (
    <View style={styles.container}>
      <Text>PetOwnerInfo</Text>
      <Text>{JSON.stringify(pet.ownerUrl)}</Text>
      <Image source={{ uri: pet?.ownerUrl }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
