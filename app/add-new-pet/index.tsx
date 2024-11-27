import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import InputField from "@/components/add-pet/InputField";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export default function AddNewPet() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({});
  const [gender, setGender] = useState<string>();
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });

    getCategories();
  }, []);

  const getCategories = async () => {
    setCategories([]);
    const snapshot = await getDocs(collection(db, "Categories"));
    snapshot.forEach((doc) => {
      setCategories((x) => [...x, doc.data()]);
    });
  };

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    console.log(formData);
  };

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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(value, index) => {
            setSelectedCategory(value), handleChange("category", value);
          }}
        >
          {categories.map((category) => (
            <Picker.Item
              key={category.name}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(value, index) => {
            setGender(value), handleChange("sex", value);
          }}
        >
          <Picker.Item label={"Male"} value={"male"} />
          <Picker.Item label={"Female"} value={"female"} />
          <Picker.Item label={"Unknown"} value={"unknown"} />
        </Picker>
      </View>
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
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
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
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  input: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    fontFamily: "outfit",
  },
});
