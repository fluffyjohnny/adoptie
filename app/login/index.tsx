import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

export default function LoginScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("./../../assets/images/login.png")}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Ready to make a new friend?</Text>
        <Text style={styles.description}>
          Let's find your next best friend.
        </Text>
        <Pressable style={styles.button}>
          <Text style={styles.btnText}>Let's go</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  image: {
    width: "100%",
    height: 500,
  },
  textContainer: {
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 32,
    textAlign: "center",
  },
  description: {
    fontFamily: "outfit",
    fontSize: 18,
    textAlign: "center",
    color: Colors.GRAY,
  },
  button: {
    padding: 14,
    marginTop: 50,
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    borderRadius: 14,
  },
  btnText: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    textAlign: "center",
  },
});
