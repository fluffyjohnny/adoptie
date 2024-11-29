import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import AboutPetInfo from "@/components/PetDetails/AboutPetInfo";
import PetOwnerInfo from "@/components/PetDetails/PetOwnerInfo";
import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const initialChat = async () => {
    const docID1 =
      user?.primaryEmailAddress?.emailAddress + "_" + pet?.ownerEmail;
    const docID2 =
      pet?.ownerEmail + "_" + user?.primaryEmailAddress?.emailAddress;

    const q = query(
      collection(db, "Inbox"),
      where("id", "in", [docID1, docID2])
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      router.push({ pathname: "/chat", params: { chatID: doc.data().id } });
    });

    if (querySnapshot.docs?.length === 0) {
      console.log("No chat found, creating new chat");

      await setDoc(doc(db, "Inbox", docID1), {
        id: docID1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: pet?.ownerEmail,
            imageUrl: pet?.ownerUrl,
            name: pet?.ownerName,
          },
        ],
      });

      router.push({ pathname: "/chat", params: { chatID: docID1 } });
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(pet)}</Text> */}
      <ScrollView style={styles.scrollViewContainer}>
        <PetInfo pet={pet} />
        <PetSubInfo pet={pet} />
        <AboutPetInfo pet={pet} />
        <PetOwnerInfo pet={pet} />
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={initialChat}>
          <Text style={styles.btn}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    marginBottom: 60,
  },
  btnContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    fontFamily: "outfit-bold",
    padding: 15,
    fontSize: 20,
    textAlign: "center",
  },
});
