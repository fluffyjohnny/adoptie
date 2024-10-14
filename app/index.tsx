import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { user } = useUser();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Pressable>
        <Link href={"/login"}>
          <Text>Go to Login Screen</Text>
        </Link>
      </Pressable>
    </View>
  );
}
