import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function AddNewPet() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Pet</Text>
      <Image source={require("../../assets/images/placeholder.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
});
