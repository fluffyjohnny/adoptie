import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; // Ensure you import setDoc

const getFavoriteList = async (user: any) => {
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

const updateFavoriteList = async (user: any, favorites: string[]) => {
  const docRef = doc(
    db,
    "UserFavoritePets",
    user?.primaryEmailAddress?.emailAddress
  );

  try {
    await updateDoc(docRef, {
      favorites,
    });
  } catch (e) {
    console.error(e);
  }
};

export { getFavoriteList, updateFavoriteList };
