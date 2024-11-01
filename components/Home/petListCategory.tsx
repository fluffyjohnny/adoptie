import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PetListItem from "./petListItem";

export default function PetListCategory() {
  const [pets, setPets] = useState<any[]>([]);

  useEffect(() => {
    getPetList("Dogs");
  }, []);

  const getPetList = async (category: string) => {
    setPets([]);
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
        horizontal={true}
        renderItem={({ item }: { item: any }) => <PetListItem pet={item} />}
      />
    </View>
  );
}
