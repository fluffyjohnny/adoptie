import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export default function Slider() {
  const [sliders, setSliders] = useState<any[]>([]);

  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setSliders((x) => [...x, doc.data()]);
    });
  };

  return (
    <View>
      <FlatList
        data={sliders}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item.name}</Text>
            <Image style={styles.image} source={{ uri: item?.url }} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: 200,
  },
});
