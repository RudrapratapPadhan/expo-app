import React, { useContext } from 'react';
import {
  View, Text, FlatList, Button,
  StyleSheet, TouchableOpacity
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.header}>Your Cart 🛒</Text>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<Text style={styles.empty}>Your cart is empty</Text>}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>
              <Button title="Remove" color="#eb3b5a" onPress={() => removeFromCart(item.id)} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  container: {
    flex: 1,
    paddingTop: 80, // space for back button
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  item: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#0f3460',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#e94560',
    marginBottom: 10,
  },
  empty: {
    marginTop: 50,
    textAlign: 'center',
    color: '#aaa',
    fontSize: 18,
    fontStyle: 'italic',
  },
});
