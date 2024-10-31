import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { FlatList } from "react-native-gesture-handler";

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
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Image style={styles.image} source={{ uri: item?.url }} />
          </View>
        )}
      />
    </View>
  );
}

const styles = {
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
};
