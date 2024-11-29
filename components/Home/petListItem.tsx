import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import SetFavorite from "../PetDetails/SetFavorite";

interface PetListItemProps {
  pet: any;
}

export default function PetListItem({ pet }: PetListItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet,
        })
      }
      style={styles.container}
    >
      <Image source={{ uri: pet?.url }} style={styles.image} />
      <View style={styles.headerContainer}>
        <Text style={styles.name}>{pet?.name}</Text>
        <SetFavorite pet={pet} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.breed}>{pet?.breed}</Text>
        <Text style={styles.age}>{pet?.age} YRS</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: "100%",
    height: 120,
    objectFit: "cover" as "cover",
    borderRadius: 10,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
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
