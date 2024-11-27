import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface InputFieldProps {
  title: string;
  field: string;
  numberOfLines: number | undefined;
  handleChange: (field: string, value: string) => void;
}

export default function InputField({
  title,
  field,
  numberOfLines,
  handleChange,
}: InputFieldProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        onChangeText={(e) => handleChange(field, e)}
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
