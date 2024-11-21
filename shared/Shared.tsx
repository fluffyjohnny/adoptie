import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Ensure you import setDoc

export const getFavoriteList = async (user: any) => {
  const docRef = doc(
    db,
    "UserFavoritePets",
    user?.primaryEmailAddress?.emailAddress
  );
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    await setDoc(docRef, {
      email: user?.primaryEmailAddress?.emailAddress,
      favorites: [],
    });
  }

  return user?.favoriteList;
};
