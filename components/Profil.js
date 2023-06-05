import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Button } from 'react-native';

const Profil = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [grade, setGrade] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villesDesirees, setVillesDesirees] = useState('');

  const handleInscription = () => {
    setNom('');
    setPrenom('');
    setTelephone('');
    setEmail('');
    setMotDePasse('');
    setGrade('');
    setEtablissement('');
    setSpecialite('');
    setVilleActuelle('');
    setVillesDesirees('');
  };

  const handleSupprimer = () => {
    // Perform delete actions
    console.log('Supprimer');
  };

  const handleModifier = () => {
    // Perform modify actions
    console.log('Modifier');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Profil :</Text>
        <Text>Nom :</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
        />
        <Text>Prénom :</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom}
          onChangeText={setPrenom}
        />
        <Text>Téléphone :</Text>
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          value={telephone}
          onChangeText={setTelephone}
        />
        <Text>Email :</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text>Mot de passe :</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={motDePasse}
          onChangeText={setMotDePasse}
        />
        <Text>Grade :</Text>
        <TextInput
          style={styles.input}
          placeholder="Grade"
          value={grade}
          onChangeText={setGrade}
        />
        <Text>Établissement :</Text>
        <TextInput
          style={styles.input}
          placeholder="Établissement"
          value={etablissement}
          onChangeText={setEtablissement}
        />
        <Text>Spécialité :</Text>
        <TextInput
          style={styles.input}
          placeholder="Spécialité"
          value={specialite}
          onChangeText={setSpecialite}
        />
        <Text>Ville actuelle :</Text>
        <TextInput
          style={styles.input}
          placeholder="Ville actuelle"
          value={villeActuelle}
          onChangeText={setVilleActuelle}
        />
        <Text>Villes désirées :</Text>
        <TextInput
          style={styles.input}
          placeholder="Villes désirées"
          value={villesDesirees}
          onChangeText={setVillesDesirees}
        />

        <Button title="Supprimer mon compte" onPress={handleSupprimer} />
        <Button title="Modifier" onPress={handleModifier} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
});

export default Profil;
