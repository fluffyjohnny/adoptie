import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";

export default function UserItem({ userInfo }: any) {
  return (
    <View style={styles.container}>
      <Link href={`/chat?chatID=${userInfo.docId}`}>
        <View style={styles.innerContainer}>
          <Image
            source={{
              uri: userInfo?.imageUrl ?? "https://placehold.co/600x400.png",
            }}
            style={styles.image}
          ></Image>
          <Text style={styles.name}>{userInfo?.name ?? "User"} </Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderBottomWidth: 0.3,
    paddingBottom: 15,
    borderColor: Colors.BLACK,
    width: "100%",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  image: {
    width: 50,
    height: 50,
    objectFit: "cover" as "cover",
    borderRadius: 50,
  },
  name: {
    fontFamily: "outfit-medium",
    fontSize: 15,
  },
});
