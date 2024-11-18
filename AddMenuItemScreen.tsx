// AddMenuItemScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


interface MenuItem {
    name: string;
    description: string;
    course: string;
    price: number;
}

const AddMenuItemScreen = ({ route, navigation }: any) => {
    const { addItem } = route.params;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState('Starters');
    const [price, setPrice] = useState('');

    const handleAddItem = () => {
        const newItem: MenuItem = {
            name,
            description,
            course,
            price: parseFloat(price),
        };
        addItem(newItem);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>Dish Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <Text>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} />
            <Text>Course</Text>
            <Picker selectedValue={course} onValueChange={setCourse}>
                <Picker.Item label="Starters" value="Starters" />
                <Picker.Item label="Mains" value="Mains" />
                <Picker.Item label="Dessert" value="Dessert" />
            </Picker>
            <Text>Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
            <Button title="Add Item" onPress={handleAddItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderWidth: 1, padding: 8, marginBottom: 10 },
});

export default AddMenuItemScreen;
