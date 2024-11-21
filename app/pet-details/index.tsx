import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import AboutPetInfo from "@/components/PetDetails/AboutPetInfo";
import PetOwnerInfo from "@/components/PetDetails/PetOwnerInfo";
import Colors from "@/constants/Colors";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(pet)}</Text> */}
      <ScrollView style={styles.scrollViewContainer}>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPetInfo pet={pet} />
        <PetOwnerInfo pet={pet} />
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity>
          <Text style={styles.btn}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    marginBottom: 60,
  },
  btnContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    fontFamily: "outfit-bold",
    padding: 15,
    fontSize: 20,
    textAlign: "center",
  },
});
