import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export default function Slider() {
  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    const docRef = await getDocs(collection(db, "sliders"));
    docRef.forEach((doc) => {
      console.log(doc.data());
    });
  };

  return (
    <View>
      <Text>Slider</Text>
    </View>
  );
}
