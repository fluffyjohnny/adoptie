import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";

export default function header() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Welcome</Text>
        {user ? <Text style={styles.nameText}>{user?.fullName}</Text> : null}
      </View>
      <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.GRAY,
  },
  nameText: {
    fontFamily: "outfit-bold",
    fontSize: 21,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: 10,
  },
});
