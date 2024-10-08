import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface MenuItem {
  name: string;
  description: string;
  course: string;
  price: number;
}

const initialMenuItems: MenuItem[] = [
  { name: "Bruschetta", description: "Toasted bread with tomatoes, garlic, and basil", course: "starters", price: 89.99 },
  { name: "Caesar Salad", description: "Romaine lettuce with Caesar dressing and croutons", course: "starters", price: 109.99 },
  { name: "Grilled Salmon", description: "Fresh salmon with lemon butter sauce", course: "mains", price: 229.99 },
  { name: "Beef Tenderloin", description: "Tender beef with red wine reduction", course: "mains", price: 299.99 },
  { name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", course: "desserts", price: 89.99 },
  { name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten center", course: "desserts", price: 99.99 },
];

const App = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState('');
  const [courses] = useState([
    { label: 'Starters', value: 'starters' },
    { label: 'Mains', value: 'mains' },
    { label: 'Desserts', value: 'desserts' }
  ]);

  const addMenuItem = useCallback(() => {
    if (name && description && course && price) {
      setMenuItems([...menuItems, { name, description, course, price: parseFloat(price) }]);
      setName('');
      setDescription('');
      setPrice('');
      setCourse('');
    } else {
      alert('Please fill in all fields');
    }
  }, [name, description, course, price, menuItems]);

  const averagePrices = useMemo(() => {
    const courseTotals: {[key: string]: {sum: number, count: number}} = {};
    menuItems.forEach(item => {
      if (!courseTotals[item.course]) {
        courseTotals[item.course] = {sum: 0, count: 0};
      }
      courseTotals[item.course].sum += item.price;
      courseTotals[item.course].count += 1;
    });

    return Object.entries(courseTotals).map(([course, {sum, count}]) => ({
      course,
      average: (sum / count).toFixed(2)
    }));
  }, [menuItems]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Christoffel's Menu</Text>

        <View style={styles.statsContainer}>
          <Text style={styles.subTitle}>Menu Statistics</Text>
          <Text style={styles.statText}>Total Items: {menuItems.length}</Text>
          {averagePrices.map(({course, average}) => (
            <Text key={course} style={styles.statText}>
              Average {course} price: R{average}
            </Text>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.subTitle}>Add New Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Dish Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <DropDownPicker
            open={open}
            value={course}
            items={courses}
            setOpen={setOpen}
            setValue={setCourse}
            style={styles.dropdown}
            placeholder="Select Course"
            zIndex={3000}
            zIndexInverse={1000}
          />
          <TextInput
            style={styles.input}
            placeholder="Price (in Rands)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <Button title="Add Menu Item" onPress={addMenuItem} />
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.subTitle}>Menu List</Text>
          <FlatList
            data={menuItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.menuItem}>
                <Text style={styles.itemName}>{item.name} - {item.course}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdown: {
    marginBottom: 12,
    borderColor: '#ccc',
  },
  menuContainer: {
    flex: 1,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2c3e50',
  },
});

export default App;
