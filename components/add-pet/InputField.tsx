import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
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
  const [error, setError] = useState<string | null>(null);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        onChangeText={(e) => handleChange(field, e)}
        onEndEditing={(e) => {
          if (
            e.nativeEvent.text?.trim() === "" ||
            e.nativeEvent.text?.trim() === undefined
          ) {
            setError("Field required.");
          } else {
            setError("");
          }
        }}
        numberOfLines={numberOfLines}
        multiline={numberOfLines ? true : false}
        style={styles.input}
      />
      {!!error && <Text style={{ color: "red" }}>{error}</Text>}
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
