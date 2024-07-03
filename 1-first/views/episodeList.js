import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import DotsPagination from 'react-native-dots-pagination';

const { width } = Dimensions.get('window');

const EpisodeList = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const EpisodeURL = "https://rickandmortyapi.com/api/episode";

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(EpisodeURL);
        const json = await response.json();
        setData(json.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetail(item)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.air_date}</Text>
      </View>
    </TouchableOpacity>
  );

  const navigateToDetail = (item) => {
    navigation.navigate('Episode Details', { episode: item });
  };

 
  const handleSearch = (text) => {
    setSearch(text.toLowerCase());
  };

  
  const filteredEpisodes = data.filter(item =>
    item.name.toLowerCase().includes(search)
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000FF" />
      </View>
    );
  }

  const firstPageEpisodes = filteredEpisodes.slice(0, 10);
  const secondPageEpisodes = filteredEpisodes.slice(10, 20);

  
  const onPageSelected = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={handleSearch} 
        value={search}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.searchInput}
      />
      <PagerView style={styles.pagerView} initialPage={0} onPageSelected={onPageSelected}>
        <View key="1" style={styles.page}>
          <FlatList
            data={firstPageEpisodes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View key="2" style={styles.page}>
          <FlatList
            data={secondPageEpisodes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </PagerView>
      <DotsPagination
        length={2} 
        activeDotWidth={10} 
        passiveDotWidth={8} 
        passiveDotHeight={8} 
        activeColor={'#555'} 
        passiveColor={'#ccc'} 
        activeIndex={currentPage} 
        containerStyle={styles.paginationContainer}
        passiveDotStyle={styles.passiveDotStyle}
        activeDotStyle={styles.activeDotStyle}
        vertical={false} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  item: {
    backgroundColor: "#F0F0F0",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagerView: {
    flex: 1,
    width: width,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activeDotStyle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#333333',
    marginHorizontal: 5,
  },
  passiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
});

export default EpisodeList;
