import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import PetListItem from "@/components/Home/PetListItem";
import Colors from "@/constants/Colors";

export default function UserPosts() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });

    user && getUser();
  }, [user]);

  const getUser = async () => {
    setUserPosts([]);
    setLoader(true);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querrySnapshot = await getDocs(q);

    querrySnapshot.forEach((doc) => {
      setUserPosts((x) => [...x, doc.data()]);
    });

    setLoader(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          console.log("cancelled");
        },
      },
      {
        text: "Delete",
        onPress: () => deletePost(id),
      },
    ]);
  };

  const deletePost = async (docID: string) => {
    await deleteDoc(doc(db, "Pets", docID));
    getUser();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UserPosts</Text>
      <FlatList
        data={userPosts}
        numColumns={2}
        refreshing={loader}
        onRefresh={getUser}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} key={index} />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleDelete(item?.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {userPosts.length === 0 && (
        <Text style={styles.noPost}>No Post Found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  title: {
    padding: 10,
    fontFamily: "outfit-bold",
    fontSize: 25,
  },
  btn: {
    padding: 10,
    backgroundColor: Colors.GRAY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  deleteText: {
    fontFamily: "outfit",
    fontSize: 15,
  },
  noPost: {
    fontFamily: "outfit",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
  },
});
