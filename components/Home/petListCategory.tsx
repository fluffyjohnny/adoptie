import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./ Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PetListItem from "./PetListItem";

export default function PetListCategory() {
  const [pets, setPets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPetList("Dogs");
  }, []);

  const getPetList = async (category: string) => {
    setIsLoading(true);
    setPets([]);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      setPets((prev) => [...prev, doc.data()]);
    });

    setIsLoading(false);
  };

  return (
    <View>
      <Category category={(value) => getPetList(value)} />
      <FlatList
        data={pets}
        // onRefresh={() => getPetList("Dogs")}
        refreshing={isLoading}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: any }) => <PetListItem pet={item} />}
        style={{ height: 390 }}
      />
    </View>
  );
}
