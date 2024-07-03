import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EpisodeList from './views/episodeList';
import EpisodeDetails from './views/episodeDetails';
import LikedCharactersScreen from './views/likedCharactersScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Episode List">
        <Stack.Screen name="Episode List" component={EpisodeList} options={{ title: 'Episode List' }} />
        <Stack.Screen name="Episode Details" component={EpisodeDetails} options={{ title: 'Episode Details' }} />
        <Stack.Screen name="Favorite Characters" component={LikedCharactersScreen} options={{ title: 'Favorite Characters' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
