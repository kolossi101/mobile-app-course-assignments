import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { FirebaseDB } from '../config/FirebaseConfig';

type Event = {
  id: string;
  title: string;
  organizer: string;
  location: string;
  isOnline: boolean;
  imageUrl: string;
  description?: string;
  date: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  category: string;
  capacity: number;
  attendees: string[];
  isFavourite: boolean;
};

type Props = {
  route: RouteProp<{ EventDetail: { event: Event } }, 'EventDetail'>;
};

const EventDetail: React.FC<Props> = ({ route, navigation }) => {
  const { event } = route.params;
  const [addToFavourite, setAddToFavourite] = useState(false);

  const dateObj = event.date.toDate();
  const createdAtObj = event.createdAt.toDate();

  const eventDate =
    dateObj.toLocaleDateString() +
    ' at ' +
    dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const createdDate =
    createdAtObj.toLocaleDateString() +
    ' at ' +
    createdAtObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  useEffect(() => {
    setAddToFavourite(event.isFavourite);
  }, []);

  const handleToggleFavourite = async () => {
    const newState = !addToFavourite;
    setAddToFavourite(newState);
    try {
      const docRef = doc(FirebaseDB, 'EventDB', event.id);
      await updateDoc(docRef, {
        isFavourite: newState,
        updatedAt: serverTimestamp(),
      });
      console.log(docRef);
      //   Alert.alert(
      //     `${event.title}`,
      //     `Favourite status updated: ${newState ? 'Added' : 'Removed'}`
      //   );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.navigate('EventList')}
        >
          <Text style={styles.favouriteButtonText}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.favouriteButton,
            {
              backgroundColor: addToFavourite ? '#CCCCCC' : '#F2F2F2',
            },
          ]}
          onPress={handleToggleFavourite}
        >
          <Text style={styles.favouriteButtonText}>Favourite</Text>
          <FontAwesome
            name={addToFavourite ? 'heart' : 'heart-o'}
            size={28}
            color={addToFavourite ? '#e74c3c' : '#555'}
          />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />

      <View style={styles.headerRow}>
        <Text style={styles.title}>{event.title}</Text>
      </View>
      <Text style={styles.label}>Organizer:</Text>
      <Text style={styles.value}>{event.organizer}</Text>

      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>
        {event.isOnline ? 'Online Event' : `${event.location}`}
      </Text>

      <Text style={styles.label}>Date:</Text>
      <Text style={styles.value}>{eventDate}</Text>

      <Text style={styles.label}>Created At:</Text>
      <Text style={styles.value}>{createdDate}</Text>

      <Text style={styles.label}>Category:</Text>
      <Text style={styles.value}>{event.category}</Text>

      <Text style={styles.label}>Capacity:</Text>
      <Text style={styles.value}>{event.capacity}</Text>

      <Text style={styles.label}>Attendees:</Text>
      <Text style={styles.value}>
        {event.attendees.length} / {event.capacity}
      </Text>

      {event.description && (
        <>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.description}>{event.description}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  favouriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#595959',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    width: '48%',
  },
  goBackButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    width: '48%',
    backgroundColor: '#ABDAE1',
    borderColor: '#416165',
  },
  favouriteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginTop: 5,
  },
});

export default EventDetail;
