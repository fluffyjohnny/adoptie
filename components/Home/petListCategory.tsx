import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import Category from "./category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export default function PetListCategory() {
  const [pets, setPets] = useState<any[]>([]);

  const getPetList = async (category: string) => {
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      setPets((x) => [...x, doc.data()]);
    });
  };

  return (
    <View>
      <Category category={(value: string) => getPetList(value)} />
      <FlatList
        data={pets}
        renderItem={({ item }: { item: any }) => (
          <View>
            <Text>{item?.name}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
