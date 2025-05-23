import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FavoritePlaylists from './FavoritePlaylists';
import RecentMixes from './RecentMixes';
import Audiobooks from './Audiobooks';
import NavBar from './NavBar';

export default function App() {
  return (
    <ScrollView backgroundColor="black" stickyHeaderIndices={[0]}>
      <NavBar
        count={4}
        categoryList={['All', 'Music', 'Podcasts', 'Audiobooks']}
        image={require('./assets/icon-apple.png')}
      />
      <View style={styles.container}>
        <FavoritePlaylists
          count={8}
          image={require('./assets/icon-playlist.png')}
          titleList={[
            'Today’s Top Hits',
            'Chill Vibes',
            'Top Hits',
            'Classic Rock',
            'Jazz Essentials',
            'Hip Hop Beats',
            'Indie Favorites',
            'Workout Mix',
          ]}
        />
        <Text style={styles.headingStyle}>Recents</Text>

        <RecentMixes
          count={6}
          image={require('./assets/icon-mix.png')}
          titleList={[
            'Lo-Fi Lounge',
            'Late Night Drive',
            'Acoustic Chill',
            'Workout Fuel',
            'Soulful Sundays',
            'Fresh Finds',
          ]}
        />
        <Text style={styles.headingStyle}>Audiobooks For You</Text>
        <Audiobooks
          count={6}
          image={require('./assets/icon-audiobook.png')}
          books={[
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
            { title: '1984', author: 'George Orwell' },
            { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
            { title: 'Pride and Prejudice', author: 'Jane Austen' },
            { title: 'Moby Dick', author: 'Herman Melville' },
            { title: 'The Story of Philosophy', author: 'Will Durant' },
          ]}
        />

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',

    backgroundColor: 'black',
  },
  headingStyle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 12,
  },
});
