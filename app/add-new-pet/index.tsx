import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import InputField from "@/components/AddPet/InputField";
import { Picker } from "@react-native-picker/picker";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "@/config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewPet() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [loader, setLoader] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [gender, setGender] = useState<string>();
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [image, setImage] = useState<string>();
  const [genderError, setGenderError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

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
    if (value !== "" && value !== null) {
      setFormData({ ...formData, [name]: value });
    } else {
      const updatedFormData = { ...formData };
      delete updatedFormData[name];
      setFormData(updatedFormData);
    }
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    if (Object.keys(formData).length < 8) {
      const message = "All fields are required.";
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        alert(message);
      }
      return;
    } else if (!image) {
      const message = "No photo uploaded.";
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        alert(message);
      }
    } else {
      setLoader(true);
      // uploadImage();
      uploadData("https://via.placeholder.com/150");
      setLoader(false);
    }
  };

  /**
   * Upload image to firebase storage
   * current not tested due to firebase plan limitation
   */
  const uploadImage = async () => {
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(
        storage,
        `/` + Date.now() + `&${formData.name}.png`
      );
      uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log(snapshot.metadata, "Fie uploaded successfully");
        })
        .then((res) =>
          getDownloadURL(storageRef).then(async (url) => {
            console.log(url);
            uploadData(url);
          })
        );
    } else {
      console.error("No image selected");
    }
  };

  /**
   * Upload data to firestore
   * @param url image url
   */
  const uploadData = async (url: string) => {
    const docID = Date.now().toString();
    await setDoc(doc(db, "Pets", docID), {
      ...formData,
      image: url,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docID,
    });

    router.replace("/(tabs)/home");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Pet</Text>
      <Text style={styles.label}>Image*</Text>
      <TouchableOpacity onPress={imagePicker}>
        {!image ? (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={styles.image}
          />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </TouchableOpacity>
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
            if (value === null) {
              setCategoryError("Field required.");
            } else {
              setCategoryError("");
            }

            setSelectedCategory(value), handleChange("category", value);
          }}
        >
          <Picker.Item key={1} label="-" value={null} />
          {categories.map((category) => (
            <Picker.Item
              key={category.name}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
        {!!categoryError && (
          <Text style={{ color: "red", marginTop: 5 }}>{categoryError}</Text>
        )}
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
            if (value === null) {
              setGenderError("Field required.");
            } else {
              setGenderError("");
            }

            setGender(value), handleChange("sex", value);
          }}
        >
          <Picker.Item label="-" value={null} />
          <Picker.Item label={"Male"} value={"male"} />
          <Picker.Item label={"Female"} value={"female"} />
          <Picker.Item label={"Unknown"} value={"unknown"} />
        </Picker>
        {!!genderError && (
          <Text style={{ color: "red", marginTop: 5 }}>{genderError}</Text>
        )}
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
      <TouchableOpacity style={styles.btn} onPress={onSubmit} disabled={loader}>
        {loader ? (
          <ActivityIndicator size="large" color={Colors.BLACK} />
        ) : (
          <Text style={styles.btnText}>Submit</Text>
        )}
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
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    marginBottom: 10,
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
