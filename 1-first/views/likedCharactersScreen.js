import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

const LikedCharacters = ({ route }) => {
  const { likedCharacters, removeFromFavorites } = route.params;
  const [removedCharacters, setRemovedCharacters] = useState([]);

  const handleRemoveFromFavorites = (character) => {
    Alert.alert(
      'Remove from Favorites',
      `Are you sure you want to remove ${character.name} from your favorites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => {
            removeFromFavorites(character);
            setRemovedCharacters(prevRemoved => [...prevRemoved, character.id]);
          },
        },
      ]
    );
  };

  const renderCharacterItem = ({ item }) => {
    let statusColor = '#000'; 
    let backgroundColor = '#D4EFDF'; 

    if (item.status === 'Dead') {
      statusColor = '#FF6347';
      backgroundColor = '#FADBD8'; 
    } else if (item.status === 'Alive') {
      statusColor = '#32CD32'; 
      backgroundColor = '#D4EFDF'; 
    } else {
      statusColor = 'orange'; 
      backgroundColor = '#FFDAB9'; 
    }

    return (
      <TouchableOpacity
        style={[styles.characterItem, { backgroundColor: backgroundColor }]}
        onPress={() => handleRemoveFromFavorites(item)}
        disabled={removedCharacters.includes(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.characterImage} />
        <View style={styles.characterInfo}>
          <Text style={[styles.boldText, styles.characterName]}>{item.name}</Text>
          <Text style={styles.normalText}>
            <Text style={styles.boldText}>Status:</Text>{' '}
            <Text style={{ color: statusColor }}>{item.status}</Text>
          </Text>
          <Text style={styles.normalText}>
            <Text style={styles.boldText}>Species:</Text> {item.species}
          </Text>
          <Text style={styles.normalText}>
            <Text style={styles.boldText}>Gender:</Text> {item.gender}
          </Text>
          <Text style={styles.normalText}>
            <Text style={styles.boldText}>Origin:</Text> {item.origin.name}
          </Text>
          <Text style={styles.normalText}>
            <Text style={styles.boldText}>Location:</Text> {item.location.name}
          </Text>
        </View>
        <View style={styles.likeIcon}>
          <Text style={styles.likedText}>❤️</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={likedCharacters}
        renderItem={renderCharacterItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  normalText: {
    marginBottom: 5,
  },
  likedText: {
    fontSize: 24,
    color: 'red',
  },
  likeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default LikedCharacters;
