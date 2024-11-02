import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Category from "./category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PetListItem from "./petListItem";

export default function PetListCategory() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPetList("Dogs");
  }, []);

  const getPetList = async (category: string) => {
    setLoading(true);
    setPets([]);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      setPets((x) => [...x, doc.data()]);
    });

    setLoading(false);
  };

  return (
    <View>
      <Category category={(value) => getPetList(value)} />
      <FlatList
        data={pets}
        horizontal={true}
        refreshing={loading}
        onRefresh={() => getPetList("Dogs")}
        renderItem={({ item }: { item: any }) => <PetListItem pet={item} />}
      />
    </View>
  );
}
