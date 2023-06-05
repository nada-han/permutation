import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Rechercher = () => {
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villesDesirees, setVillesDesirees] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Prepare search query parameters
      const params = {
        specialite,
        villeActuelle,
        villesDesirees,
      };

      // Perform search request
      const response = await fetch('https://plain-teal-bull.cyclic.app/professeurs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const data = await response.json();

      // Set search results
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Rechercher :</Text>
        <Text>Spécialité :</Text>
        <DropDownPicker
          items={specialiteOptions}
          defaultValue={specialite}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          itemStyle={styles.dropdownItem}
          dropDownStyle={styles.dropdownList}
          onChangeItem={item => setSpecialite(item.value)}
        />

        <Text>Ville actuelle :</Text>
        <DropDownPicker
          items={villeActuelleOptions}
          defaultValue={villeActuelle}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          itemStyle={styles.dropdownItem}
          dropDownStyle={styles.dropdownList}
          onChangeItem={item => setVilleActuelle(item.value)}
        />

        <Text>Villes désirées :</Text>
        <DropDownPicker
          items={villesDesireesOptions}
          defaultValue={villesDesirees}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          itemStyle={styles.dropdownItem}
          dropDownStyle={styles.dropdownList}
          onChangeItem={item => setVillesDesirees(item.value)}
        />

        <Button title="Rechercher" onPress={handleSearch} />

        <Text style={styles.resultTitle}>Résultats de recherche :</Text>
        {results.map((result, index) => (
          <View style={styles.resultItem} key={index}>
            <Text>{result.nom}</Text>
            <Text>{result.prenom}</Text>
            {/* Display other result fields as needed */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownList: {
    marginTop: -1,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  resultItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

// Options for specialite dropdown
const specialiteOptions = [
  { label: 'Biologie', value: 'Biologie' },
  { label: '', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  // Add more options as needed
];

// Options for villeActuelle dropdown
const villeActuelleOptions = [
  { label: 'Beni Mellal', value: 'BeniMellal' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  // Add more options as needed
];

// Options for villesDesirees dropdown
const villesDesireesOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  // Add more options as needed
];

export default Rechercher;
