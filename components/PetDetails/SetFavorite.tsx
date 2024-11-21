import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getFavoriteList, updateFavoriteList } from "@/shared/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function SetFavorite({ pet }: any) {
  const { user } = useUser();
  const [favouriteList, setFavoriteList] = useState<string[]>([]);

  useEffect(() => {
    user && fetchFavoriteList();
  }, []);

  const fetchFavoriteList = async (): Promise<void> => {
    const res = await getFavoriteList(user);
    setFavoriteList(res.favorites ?? []);
  };

  const addFavorite = async (): Promise<void> => {
    const newFavoriteList = [...favouriteList, pet?.id];
    await updateFavoriteList(user, newFavoriteList);
    fetchFavoriteList();
  };

  const removeFavorite = async (): Promise<void> => {
    const newFavoriteList = favouriteList.filter((id) => id !== pet?.id);
    await updateFavoriteList(user, newFavoriteList);
    fetchFavoriteList();
  };

  return (
    <View>
      {favouriteList.includes(pet?.id) ? (
        <TouchableOpacity
          onPress={() => {
            removeFavorite();
          }}
        >
          <Ionicons name="heart" color="pink" size={20} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            addFavorite();
          }}
        >
          <Ionicons name="heart-outline" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
