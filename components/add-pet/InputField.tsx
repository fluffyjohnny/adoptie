import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface InputFieldProps {
  title: string;
  field: string;
  numberOfLines: number | undefined;
}

export default function InputField({
  title,
  field,
  numberOfLines,
}: InputFieldProps) {
  const handleInputChange = (change: string, value: string) => {
    console.log(change, value);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        onChangeText={(e) => handleInputChange(field, e)}
        numberOfLines={numberOfLines}
        multiline={numberOfLines ? true : false}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  input: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    fontFamily: "outfit",
  },
});
