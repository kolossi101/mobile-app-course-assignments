import { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore';
import { FirebaseDB } from '../config/FirebaseConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

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

  const confirmClearAllFavourites = async () => {
    Alert.alert(
      'Clear All Confirmation',
      'Are you sure you want to clear all your favourites?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Clear All',
          onPress: clearAllFavourites,
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const clearAllFavourites = async () => {
    try {
      const querySnapshot = await getDocs(collection(FirebaseDB, 'EventDB'));

      const updates = querySnapshot.docs.map(async (row) => {
        const docRef = doc(FirebaseDB, 'EventDB', row.id);
        await updateDoc(docRef, {
          isFavourite: false,
        });
      });

      await Promise.all(updates);

      Alert.alert(
        `Favourites Cleared!`,
        'All your favourites have been cleared'
      );

      await getFavEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemFromFavourites = async (item: Event) => {
    try {
      const docRef = doc(FirebaseDB, 'EventDB', item.id);
      await updateDoc(docRef, {
        isFavourite: false,
        updatedAt: serverTimestamp(),
      });
      await getFavEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDeleteItemFromFavourites = async (item: Event) => {
    Alert.alert(
      `${item.title} by ${item.organizer}`,
      'Are you sure you want to delete this event from Favourites?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteItemFromFavourites(item),
          style: 'destructive',
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      getFavEvents();
    }, [])
  );

  useEffect(() => {
    getFavEvents();
  }, []);

  const FavEventItem = ({
    item,
    onPress,
  }: {
    item: Event;
    onPress: () => void;
  }) => {
    const startDatetime = item.startDatetime.toDate().toLocaleDateString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const endDatetime = item.endDatetime.toDate().toLocaleDateString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          {item.organizer && (
            <Text style={styles.organizer}>By {item.organizer}</Text>
          )}

          <Text style={styles.date}>Starts {startDatetime}</Text>
          <Text style={styles.date}>Ends {endDatetime}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <View style={styles.deleteArea}>
          <FontAwesome
            style={{ marginLeft: 'auto' }}
            name="trash"
            size={32}
            color="#2d3a60"
            onPress={() => confirmDeleteItemFromFavourites(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <TouchableOpacity
          style={[
            styles.clearFavouritesButton,
            {
              backgroundColor: '#CCCCCC',
            },
          ]}
          onPress={confirmClearAllFavourites}
        >
          <Text style={styles.clearFavouritesButtonText}>
            Clear All Favourites
          </Text>
          <FontAwesome name="trash" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item) => item.id}
        data={favEventList}
        renderItem={({ item }) => (
          <FavEventItem
            item={item}
            onPress={() => navigation.navigate('EventDetail', { event: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcff',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    resizeMode: 'cover',
    backgroundColor: '#d6e4ff',
  },
  cardContent: { padding: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: '#2d3a60', marginBottom: 4 },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  placeholderText: { color: '#757575', fontSize: 12, textAlign: 'center' },
  organizer: {
    fontSize: 14,
    color: '#4e5d78',
    marginBottom: 4,
    fontWeight: '500',
  },
  date: { fontSize: 13, color: '#5c7080', marginBottom: 2 },
  location: { fontSize: 13, color: '#1e88e5', marginBottom: 4 },
  deleteArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  clearFavouritesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#595959',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    width: '75%',
  },
  clearFavouritesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default FavEventList;
