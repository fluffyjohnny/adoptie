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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && getFavoriteID();
  }, [user]);

  const getFavoriteID = async () => {
    setLoader(true);
    const res = await getFavoriteList(user);
    setFavoriteID(res?.favorites);
    setLoader(false);
    getFavoritePetList(res?.favorites);
  };

  const getFavoritePetList = async (favorites: string[]) => {
    setLoader(true);
    setFavoritePetList([]);
    const q = query(collection(db, "Pets"), where("id", "in", favorites));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setFavoritePetList((prev) => [...prev, doc.data()]);
    });

    setLoader(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favoritePetList}
        numColumns={2}
        onRefresh={getFavoriteID}
        refreshing={loader}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "outfit-bold",
  },
});
