import { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { FirebaseDB } from '../config/FirebaseConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const EventList: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
  route,
}) => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllEvents = async () => {
    try {
      setLoading(true);
      const collectionRef = collection(FirebaseDB, 'EventDB');

      const eventDocs = await getDocs(collectionRef);
      const localEvents = [];
      eventDocs.forEach((doc) => {
        const Event = {
          id: doc.id,
          ...doc.data(),
        };

        localEvents.push(Event);
      });
      setEventList(localEvents);
    
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllEvents();
    }, [])
  );

  const EventItem = ({
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
          <Text style={styles.location}>Located in {item.location}</Text>
          <Text style={styles.date}>Starts {startDatetime}</Text>
          <Text style={styles.date}>Ends {endDatetime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B1D51" />
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={eventList}
          renderItem={({ item }) => (
            <EventItem
              item={item}
              onPress={() =>
                navigation.navigate('EventDetail', { event: item })
              }
            />
          )}
        />
      )}
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
    borderWidth: 1,
    borderColor: '#1B3022',
  },
  image: {
    width: 100,
    resizeMode: 'cover',
    backgroundColor: '#d6e4ff',
  },
  cardContent: { padding: 12, flex: 1, justifyContent: 'center' },
  title: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: '#0B1D51',
    marginBottom: 2,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  placeholderText: { color: '#757575', fontSize: 12, textAlign: 'center' },
  organizer: {
    fontSize: 14,
    color: '#0B1D51',
    marginBottom: 4,
    fontFamily: 'Nunito_400Regular_Italic',
  },
  date: {
    fontSize: 11,
    color: '#5c7080',
    marginBottom: 2,
    fontFamily: 'Nunito_400Regular',
  },
  location: {
    fontSize: 13,
    color: '#0B1D51',
    marginTop: 8,
    marginBottom: 4,
    fontFamily: 'Nunito_400Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventList;
