import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FirebaseDB } from '../config/FirebaseConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const FavEventList: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
  route,
}) => {
  const [favEventList, setFavEventList] = useState([]);

  const getFavEvents = async () => {
    try {
      const q = query(
        collection(FirebaseDB, 'EventDB'),
        where('isFavourite', '==', true)
      );
      const queryResult = await getDocs(q);

      const localEvents = [];
      queryResult.forEach((doc) => {
        const Event = {
          id: doc.id,
          ...doc.data(),
        };

        localEvents.push(Event);
      });
      setFavEventList(localEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFavEvents();
    }, [])
  );

  const FavEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EventDetail', { event: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>
          {item.date.toDate().toLocaleDateString()}
        </Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={favEventList}
        renderItem={({ item }) => <FavEventItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  cardContent: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
  location: {
    fontSize: 14,
    color: '#999',
  },
});

export default FavEventList;
