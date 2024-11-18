import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const AddMenuItemScreen = ({ navigation, route }) => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [courses] = useState([
    { label: 'Starters', value: 'starters' },
    { label: 'Mains', value: 'mains' },
    { label: 'Dessert', value: 'dessert' },
  ]);

  const addMenuItem = () => {
    // Basic validation to ensure all fields are filled
    if (!dishName || !description || !price || !course) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    
    // Ensure the price is a valid number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      Alert.alert("Error", "Please enter a valid number for price");
      return;
    }

    const newItem = { dishName, description, course, price: parsedPrice.toFixed(2) };
    route.params?.addMenuItem(newItem);
    setDishName('');
    setDescription('');
    setPrice('');
    setCourse(null);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Menu Item</Text>
      
      <TextInput
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <DropDownPicker
        open={open}
        value={course}
        items={courses}
        setOpen={setOpen}
        setValue={setCourse}
        placeholder="Select a Course"
        style={styles.dropdown}
      />

      <Button title="Add Menu Item" onPress={addMenuItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  dropdown: { marginBottom: 10 },
});

export default AddMenuItemScreen;
