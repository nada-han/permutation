import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';


const Accueil = () => {
  const [numProfsInscrits, setNumProfsInscrits] = useState(0);
  const [specialites, setSpecialites] = useState([]);
  const [grades, setGrades] = useState([]);
  const [villesDesirees, setVillesDesirees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    fetchNumProfsInscrits();
    fetchProfsBySpeciality();
    fetchProfsByGrade();
    fetchVillesDesirees();
  }, []);

  const fetchNumProfsInscrits = async () => {
    try {
      const response = await axios.get('https://troubled-red-garb.cyclic.app/professeurs');
      const data = response.data;
      const numProfsInscrits = data.length;
      setNumProfsInscrits(numProfsInscrits);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de professeurs inscrits:', error);
    }
  };

  const fetchProfsBySpeciality = async () => {
    try {
      const response = await axios.get('https://troubled-red-garb.cyclic.app/professeurs');
      const data = response.data;
      const specialties = countProfessorsBySpecialty(data);
      const sortedSpecialties = [...specialties.entries()].sort((a, b) => b[1] - a[1]);
      const top13Specialties = sortedSpecialties.slice(0, 13);
      const colors = [
        '#7BA05B','#0070BB','#856088','#3D0C02','#36454F','#FDEE00','#2F4F4F','#FF0800','#AB274F','#EEDC82','#5A4FCF',
        '#C70039','#900C3F',
      ]; 
      const chartData = top13Specialties.map(([label, value], index) => ({
        name: label,
        value,
        color: colors[index % colors.length],
        isSelected: false,
      }));
      setSpecialites(chartData);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques par spécialité:', error);
      setIsLoading(false);
    }
  };

  const fetchProfsByGrade = async () => {
    try {
      const response = await axios.get('https://troubled-red-garb.cyclic.app/professeurs');
      const data = response.data;
      const grades = countProfessorsByGrade(data);
      const sortedGrades = [...grades.entries()].sort((a, b) => b[1] - a[1]);
      const top13Grades = sortedGrades.slice(0, 13);
      const colors = [
        '#C8A2C8','#FDEE00','#355E3B','#007FFF','#6050DC','#8B0000','#4B0082','#00FFFF',
      ];
      const chartData = top13Grades.map(([label, value], index) => ({
        name: label,
        value,
        color: colors[index % colors.length],
        isSelected: false,
      }));
      setGrades(chartData);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques par grade:', error);
      setIsLoading(false);
    }
  };

  const fetchVillesDesirees = async () => {
    try {
      const response = await axios.get('https://troubled-red-garb.cyclic.app/professeurs');
      const data = response.data;
      const villesDesirees = countProfessorsByVilleDesiree(data);
      const sortedVillesDesirees = [...villesDesirees.entries()].sort((a, b) => b[1] - a[1]);
      const top15VillesDesirees = sortedVillesDesirees.slice(0, 15);
      const colors = [
        '#856088', '#3D0C02', '#FFBF00','#EEDC82','#5A4FCF','#C70039','#900C3F','#B9D9EB', '#2F4F4F', '#FF0800', '#0000B8', '#EEDC82','#7BA05B', '#0070BB',
      ];
      const chartData = top15VillesDesirees.map(([label, value], index) => ({
        name: label,
        value,
        color: colors[index % colors.length],
        isSelected: false,
      }));
      setVillesDesirees(chartData);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques par ville désirée:', error);
      setIsLoading(false);
    }
  };

  const countProfessorsBySpecialty = (data) => {
    const specialties = new Map();
    data.forEach((prof) => {
      const { specialite } = prof;
      if (specialties.has(specialite)) {
        specialties.set(specialite, specialties.get(specialite) + 1);
      } else {
        specialties.set(specialite, 1);
      }
    });
    return specialties;
  };

  const countProfessorsByGrade = (data) => {
    const grades = new Map();
    data.forEach((prof) => {
      const { grade } = prof;
      if (grades.has(grade)) {
        grades.set(grade, grades.get(grade) + 1);
      } else {
        grades.set(grade, 1);
      }
    });
    return grades;
  };

  const countProfessorsByVilleDesiree = (data) => {
    const villesDesirees = new Map();
    data.forEach((prof) => {
      const { villeDesiree } = prof;
      if (villeDesiree) {
        if (villesDesirees.has(villeDesiree)) {
          villesDesirees.set(villeDesiree, villesDesirees.get(villeDesiree) + 1);
        } else {
          villesDesirees.set(villeDesiree, 1);
        }
      }
    });
    return villesDesirees;
  };

  const handleChartItemPress = (item) => {
    setSelectedValue(item.name);
  };

  const renderChartLabels = (data) => {
    return data.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.labelContainer,
          selectedValue === item.name && styles.selectedLabelContainer,
        ]}
        onPress={() => handleChartItemPress(item)}
      >
        <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
        <Text style={styles.labelText}>{item.name}</Text>
        
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Statistiques</Text>
        <Text style={styles.stats}>Nombre de profs inscrits : {numProfsInscrits}</Text>
        <View style={styles.separator} />
        <Text style={styles.stats}>Nombre de profs par spécialité :</Text>
        <View style={styles.chartContainer}>
        <Animatable.View animation="rotate" duration={1000}>
           
          <PieChart
            data={specialites}
            width={300}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={false}
            
          />
        </Animatable.View>
        </View>
        
        <View style={styles.chartLabelsContainer}>{renderChartLabels(specialites)}</View>
        <View style={styles.separator} />
        <Text style={styles.stats}>Villes les plus demandées :</Text>
        <View style={styles.chartContainer}>
        <Animatable.View animation="rotate" duration={1000}>
          <PieChart
            data={villesDesirees}
            width={300}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={false}
          />
        </Animatable.View>
        </View>
        
        <View style={styles.chartLabelsContainer}>{renderChartLabels(villesDesirees)}</View>
        <View style={styles.separator} />
        <Text style={styles.stats}>Nombre de profs par grade :</Text>
        <View style={styles.chartContainer}>
        <Animatable.View animation="rotate" duration={1000}>
          <PieChart
            data={grades}
            width={300}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={false}
          />
        </Animatable.View>
        </View>
      
        <View style={styles.chartLabelsContainer}>{renderChartLabels(grades)}</View>
        <View style={styles.separator} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    
  },
  stats: {
    fontSize: 16,
    marginBottom: 5,
  },

  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  
  chartLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 10,
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  selectedLabelContainer: {
    backgroundColor: '#F5F5F5',
  },
  colorIndicator: {
    width: 10,
    height: 10,
    marginRight: 5,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#3B3C36',
    marginVertical: 10,
  },
});

export default Accueil;
