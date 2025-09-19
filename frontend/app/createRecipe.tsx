// app/createRecipe.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TextInput,
  Pressable,
  Alert
} from 'react-native';
import { router } from 'expo-router';

export default function CreateRecipe() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSave = () => {
    if (!recipeName.trim()) {
      Alert.alert('Error', 'Please enter recipe name');
      return;
    }
    
    // Save logic यहाँ add करें
    Alert.alert('Success', 'Recipe saved successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Close button */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.closeButton}>✕</Text>
        </Pressable>
        <Text style={styles.headerTitle}>New Recipe</Text>
        <Pressable onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </Pressable>
      </View>

      {/* Form Content */}
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Recipe Name *</Text>
          <TextInput
            style={styles.input}
            value={recipeName}
            onChangeText={setRecipeName}
            placeholder="Enter recipe name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Ingredients</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={ingredients}
            onChangeText={setIngredients}
            placeholder="List your ingredients..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Instructions</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={instructions}
            onChangeText={setInstructions}
            placeholder="Write cooking instructions..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
});
