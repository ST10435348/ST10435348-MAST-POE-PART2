import React, { useState } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([
    
    {
      id: '2',
      dishName: 'Grilled Steak',
      description: 'Juicy and tender main course',
      course: 'mains',
      price: 150,
    },
    {
      id: '3',
      dishName: 'Chocolate Cake',
      description: 'Rich and moist dessert',
      course: 'dessert',
      price: 70,
    },
  ]);

  const addMenuItem = (item) => {
    setMenuItems([...menuItems, { ...item, id: `${menuItems.length + 1}` }]);
  };

  const getAveragePriceByCourse = (course) => {
    const items = menuItems.filter(item => item.course === course);
    if (items.length === 0) return 'R0.00';
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
    return `R${(total / items.length).toFixed(2)}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Menu</Text>
            <Text style={styles.count}>Total Items: {menuItems.length}</Text>
            
            <View style={styles.averageContainer}>
              <Text style={styles.averageHeader}>Average Prices by Course:</Text>
              <Text>Starters: {getAveragePriceByCourse('starters')}</Text>
              <Text>Mains: {getAveragePriceByCourse('mains')}</Text>
              <Text>Dessert: {getAveragePriceByCourse('dessert')}</Text>
            </View>
          </View>
        }
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.dishName}</Text>
            <Text>{item.description}</Text>
            <Text>Course: {item.course}</Text>
            <Text>Price: R{item.price}</Text>
          </View>
        )}
        ListFooterComponent={
          <Button
            title="Add New Item"
            onPress={() => navigation.navigate('AddMenuItem', { addMenuItem })}
          />
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 15,
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  count: { 
    fontSize: 16, 
    marginBottom: 10 
  },
  averageContainer: { 
    backgroundColor: '#e9ecef', 
    padding: 10, 
    borderRadius: 5,
    marginBottom: 15,
  },
  averageHeader: { 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  menuItem: { 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    marginBottom: 5 
  },
  itemName: { 
    fontWeight: 'bold' 
  },
});

export default HomeScreen;