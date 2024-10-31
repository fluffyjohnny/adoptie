import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { FlatList } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";

export default function Category() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const snapshot = await getDocs(collection(db, "Categories"));
    snapshot.forEach((doc) => {
      // console.log(doc.data());
      setCategories((x) => [...x, doc.data()]);
    });
  };

  return (
    <View>
      <Text>Category</Text>
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item }) => (
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item?.url }} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = {
  imageContainer: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
  },
  image: {
    width: 40,
    height: 40,
  },
};
