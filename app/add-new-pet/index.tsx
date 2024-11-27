import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import InputField from "@/components/add-pet/InputField";

export default function AddNewPet() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({});

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Pet</Text>
      <Image
        source={require("../../assets/images/placeholder.png")}
        style={styles.image}
      />
      <InputField
        title="Pet Name*"
        field="name"
        numberOfLines={undefined}
        handleChange={handleChange}
      />
      <InputField
        title="Breed*"
        field="breed"
        numberOfLines={undefined}
        handleChange={handleChange}
      />
      <InputField
        title="Age*"
        field="age"
        numberOfLines={undefined}
        handleChange={handleChange}
      />
      <InputField
        title="Weight*"
        field="weight"
        numberOfLines={undefined}
        handleChange={handleChange}
      />
      <InputField
        title="Address*"
        field="address"
        numberOfLines={undefined}
        handleChange={handleChange}
      />
      <InputField
        title="About*"
        field="about"
        numberOfLines={5}
        handleChange={handleChange}
      />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
  },
  btn: {
    marginTop: 15,
    marginBottom: 35,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: "outfit-medium",
    textAlign: "center",
  },
});
