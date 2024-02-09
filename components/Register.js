import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const baseUrl = "http://10.0.2.2:5007/api";
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fullname: "",
    first_name: "",
    last_name: "",
    confirm: "",
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Registration successful");
        navigation.navigate('Login'); 
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  const handleSignInPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <View style={styles.registerCard}>
          <Text style={styles.heading}>User Registration</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.fullname}
            onChangeText={(text) => handleInputChange("fullname", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.first_name}
            onChangeText={(text) => handleInputChange("first_name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.last_name}
            onChangeText={(text) => handleInputChange("last_name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Your Password"
            secureTextEntry
            value={formData.confirm}
            onChangeText={(text) => handleInputChange("confirm", text)}
          />
          <Button title="Register" onPress={handleSubmit} />
          <View style={styles.signInContainer}>
            <Button title="Already got an Account? Sign In" onPress={handleSignInPress} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  registerContainer: {
    width: "80%",
  },
  registerCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  signInContainer: {
    marginTop: 5,
  }
});

export default Register;
