import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { getFavoriteList } from "@/shared/Shared";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PetListItem from "@/components/Home/PetListItem";

export default function Favorite() {
  const { user } = useUser();
  const [favoriteID, setFavoriteID] = useState<string[] | null>([]);
  const [favoritePetList, setFavoritePetList] = useState<any[]>([]);

  useEffect(() => {
    user && getFavoriteID();
  }, [user]);

  const getFavoriteID = async () => {
    const res = await getFavoriteList(user);
    setFavoriteID(res?.favorites);
    getFavoritePetList();
  };

  const getFavoritePetList = async () => {
    const q = query(collection(db, "Pets"), where("id", "in", favoriteID));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setFavoritePetList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorite</Text>

      <FlatList
        data={favoritePetList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "outfit-bold",
  },
});
