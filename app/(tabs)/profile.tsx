import Colors from "@/constants/Colors";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const menu: { id: number; name: string; icon: string; path: string }[] = [
    { id: 1, name: "Add New Pet", icon: "add-circle", path: "/add-new-pet" },
    { id: 5, name: "My posts", icon: "bookmark", path: "/user-posts" },
    { id: 2, name: "Favorites", icon: "heart", path: "/(tabs)/favorites" },
    { id: 3, name: "Inbox", icon: "chatbubble", path: "/(tabs)/inbox" },
    { id: 4, name: "Logout", icon: "exit", path: "logout" },
  ];

  const handlePress = (path: any) => {
    if (path === "logout") {
      signOut();
      return;
    }
    router.push(path);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: user?.imageUrl ?? "https://placehold.co/600x400.png",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user?.fullName}</Text>
        <Text style={styles.email}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      <FlatList
        data={menu}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.iconContainer}
            key={index}
            onPress={() => handlePress(item.path)}
          >
            <Ionicons
              name={item?.icon as keyof typeof Ionicons.glyphMap}
              size={24}
              color={Colors.OUTLINE}
              style={styles.icon}
            />
            <Text style={styles.iconText}>{item?.name}</Text>
          </TouchableOpacity>
        )}
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
    fontFamily: "outfit-bold",
    fontSize: 25,
    marginBottom: 20,
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontFamily: "outfit-medium",
    fontSize: 15,
  },
  email: {
    fontFamily: "outfit-medium",
    fontSize: 15,
    color: Colors.GRAY,
  },
  iconContainer: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  icon: {
    padding: 20,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 10,
  },
  iconText: {
    fontFamily: "outfit",
    fontSize: 15,
  },
});
