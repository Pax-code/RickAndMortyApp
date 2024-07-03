import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const EpisodeDetails = ({ route }) => {
  const navigation = useNavigation(); 
  const { episode } = route.params || {}; 
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedCharacters, setLikedCharacters] = useState([]);
  
  useEffect(() => {
    if (episode) { 
      const fetchCharacters = async () => {
        try {
          const charactersData = await Promise.all(
            episode.characters.map(async characterUrl => {
              const response = await fetch(characterUrl);
              return response.json();
            })
          );
          setCharacters(charactersData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching characters:', error);
          setLoading(false);
        }
      };

      fetchCharacters();
    }
  }, [episode]);

  const handleLikeCharacter = character => {
    if (likedCharacters.some(c => c.id === character.id)) {
      setLikedCharacters(prevLiked => prevLiked.filter(c => c.id !== character.id));
    } else {
      if (likedCharacters.length < 10) {
        setLikedCharacters(prevLiked => [...prevLiked, character]);
      } else {
        alert('You can only like up to 10 characters.');
      }
    }
  };

  if (!episode) { 
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{episode.name}</Text>
        <Text style={styles.subtitle}>{episode.air_date}</Text>

        <Text style={styles.sectionTitle}>Characters:</Text>
        <View style={styles.charactersContainer}>
          {characters.map(character => (
            <TouchableOpacity key={character.id} style={styles.characterItem} onPress={() => handleLikeCharacter(character)}>
              <Image source={{ uri: character.image }} style={styles.characterImage} />
              <Text>{character.name}</Text>
              <View style={styles.likeIcon}>
                {likedCharacters.some(c => c.id === character.id) ? (
                  <Text style={styles.likedText}>❤️</Text>
                ) : (
                  <Text style={styles.likeText}>🤍</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Button to navigate to LikedCharacters screen */}
        <TouchableOpacity style={styles.viewLikedButton} onPress={() => navigation.navigate('Favorite Characters', { likedCharacters })}>
          <Text style={styles.viewLikedText}>View Liked Characters</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  charactersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  characterItem: {
    alignItems: 'center',
    margin: 10,
  },
  characterImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  likeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  likeText: {
    fontSize: 24,
  },
  likedText: {
    fontSize: 24,
    color: 'red',
  },
  viewLikedButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  viewLikedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EpisodeDetails;
