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
import { collection, getDocs } from 'firebase/firestore';
import { FirebaseDB } from '../config/FirebaseConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const EventList: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
  route,
}) => {
  const [eventList, setEventList] = useState([]);

  const getAllEvents = async () => {
    try {
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
      console.log(localEvents);
    } catch (error) {
      console.log(error);
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
      <FlatList
        keyExtractor={(item) => item.id}
        data={eventList}
        renderItem={({ item }) => (
          <EventItem
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
  cardContent: { padding: 12, flex: 1, justifyContent: 'center' },
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
  location: { fontSize: 13, color: '#1e88e5', marginBottom: 4,  },
});

export default EventList;
