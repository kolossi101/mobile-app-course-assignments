import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import {
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { FirebaseDB } from '../config/FirebaseConfig';

type Event = {
  id: string;
  title: string;
  organizer: string;
  location: string;
  isOnline: boolean;
  imageUrl: string;
  description?: string;
  startDatetime: Timestamp;
  endDatetime: Timestamp;
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

  const startDateObj = event.startDatetime.toDate();
  const endDateObj = event.endDatetime.toDate();
  const createdAtObj = event.createdAt.toDate();

  const eventStartDate =
    startDateObj.toLocaleDateString() +
    ' at ' +
    startDateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const eventEndDate =
    endDateObj.toLocaleDateString() +
    ' at ' +
    endDateObj.toLocaleTimeString([], {
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

  useFocusEffect(
    useCallback(() => {
      const fetchEvent = async () => {
        try {
          const docRef = doc(FirebaseDB, 'EventDB', event.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const updatedEvent = docSnap.data() as Event;
            setAddToFavourite(updatedEvent.isFavourite);
          }
        } catch (error) {
          console.error('Failed to fetch updated event:', error);
        }
      };

      fetchEvent();
    }, [event.id])
  );

  const handleToggleFavourite = async () => {
    const newState = !addToFavourite;
    setAddToFavourite(newState);
    try {
      const docRef = doc(FirebaseDB, 'EventDB', event.id);
      await updateDoc(docRef, {
        isFavourite: newState,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.favouriteButton,
            {
              backgroundColor: addToFavourite ? '#C2F970' : '#F2F2F2',
            },
          ]}
          onPress={handleToggleFavourite}
        >
          <Text style={styles.favouriteButtonText}>Favourite</Text>
          <FontAwesome
            name={addToFavourite ? 'heart' : 'heart-o'}
            size={28}
            color={addToFavourite ? '#1B3022' : '#555'}
          />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />

      <View style={styles.headerRow}>
        <Text style={styles.title}>{event.title}</Text>
      </View>
      <Text style={styles.label}>Organizer</Text>
      <Text style={styles.value}>{event.organizer}</Text>

      <Text style={styles.label}>Location</Text>
      <Text style={styles.value}>
        {event.isOnline ? 'Online Event' : `${event.location}`}
      </Text>

      <Text style={styles.label}>Starts</Text>
      <Text style={styles.value}>{eventStartDate}</Text>

      <Text style={styles.label}>Ends</Text>
      <Text style={styles.value}>{eventEndDate}</Text>

      <Text style={styles.label}>Created On</Text>
      <Text style={styles.value}>{createdDate}</Text>

      <Text style={styles.label}>Event Category</Text>
      <Text style={styles.value}>{event.category}</Text>

      <Text style={styles.label}>Capacity</Text>
      <Text style={styles.value}>{event.capacity}</Text>

      <Text style={styles.label}>Attendees</Text>
      <Text style={styles.value}>
        {event.attendees.length} / {event.capacity}
      </Text>

      {event.description && (
        <>
          <Text style={styles.label}>Description</Text>
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
    borderColor: '#1B3022',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    flex: 1,
    marginRight: 10,
    color: '#1B3022',
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
    borderColor: '#1B3022',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    width: '48%',
  },
  goBackButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: '48%',
    backgroundColor: '#FCAF58',
    borderColor: '#1B3022',
  },
  favouriteButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    color: '#1B3022',
  },
  goBackButtonText: {
    fontSize: 16,
    color: '#1B3022',
    fontFamily: 'Nunito_600SemiBold',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    marginTop: 10,
    marginBottom: 4,
    color: '#1B3022',
  },
  value: {
    fontSize: 14,
    color: '#1B3022',
    backgroundColor: '#f4f7fb',
    padding: 12,
    borderRadius: 6,
    fontFamily: 'Nunito_400Regular',
    borderWidth: 1,
    borderColor: '#1B3022',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular_Italic',
    color: '#444',
    lineHeight: 22,
    marginTop: 5,
    backgroundColor: '#f4f7fb',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1B3022',
  },
});

export default EventDetail;
