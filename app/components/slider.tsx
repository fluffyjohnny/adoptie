import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { FlatList } from "react-native-gesture-handler";

export default function Slider() {
  const [sliders, setSliders] = React.useState<any[]>([]);

  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    const docRef = await getDocs(collection(db, "sliders"));
    docRef.forEach((doc) => {
      console.log(doc.data());
      setSliders((sliders) => [...sliders, doc.data()]);
    });
  };

  return (
    <View>
      <FlatList
        data={sliders}
        renderItem={({ item, index }) => (
          <View>
            <Image source={{ uri: item?.url }} />
          </View>
        )}
      />
    </View>
  );
}
