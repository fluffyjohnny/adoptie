import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import Colors from "@/constants/Colors";

export default function AboutPetInfo({ pet }: any) {
  const [readMore, setReadMore] = useState(true);

  return (
    <View>
      <Text style={styles.title}>About {pet?.name}</Text>
      <Text style={styles.about} numberOfLines={readMore ? 2 : 10}>
        {pet?.about ?? "No information available"}
      </Text>
      {readMore && (
        <Pressable onPress={() => setReadMore(false)}>
          <Text style={styles.readMore}>Read more</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    margin: 15,
    paddingTop: 15,
  },
  about: {
    fontFamily: "outfit",
    fontSize: 16,
    marginHorizontal: 15,
  },
  readMore: {
    fontFamily: "outfit",
    color: Colors.LINK,
    margin: 16,
  },
});
