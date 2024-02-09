import * as React from "react";
import { Button, FlatList, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { products } from "../products";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => <ProductCard {...item} />}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
