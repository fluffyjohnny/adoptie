import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import Colors from "@/constants/Colors";

interface CategoryProps {
  category: (value: string) => void;
}

export default function Category({ category }: CategoryProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const snapshot = await getDocs(collection(db, "Categories"));
    snapshot.forEach((doc) => {
      setCategories((x) => [...x, doc.data()]);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Category</Text>
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(item?.name)}
            style={{ flex: 1 }}
          >
            <View
              style={[
                styles.imageContainer,
                selectedCategory == item?.name && styles.selectedCategory,
              ]}
            >
              <Image style={styles.image} source={{ uri: item?.url }} />
            </View>
            <Text style={styles.name}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = {
  container: {
    padding: 10,
  },
  imageContainer: {
    padding: 10,
    backgroundColor: Colors.SECONDARY,
    alignItems: "center" as "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  image: {
    width: 40,
    height: 40,
  },
  name: {
    textAlign: "center" as "center",
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  selectedCategory: {
    backgroundColor: Colors.PRIMARY,
  },
};
