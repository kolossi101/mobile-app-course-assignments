import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const RecentMixes = (props) => {
  return (
    <View style={styles.mixContainer}>
      {[...Array(props.count)].map((_, index) => (
        <TouchableOpacity key={index} style={styles.mixStyle}>
          <ImageBackground source={props.image} style={styles.mixImageStyle}>
            <View style={styles.mixImageOverlay}>
              <Text
                style={{ color: 'white', textAlign: 'center' }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {props.titleList[index]}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.mixInfoStyle}>
            <Text style={{ color: 'white', fontSize: 11 }}>Playlist</Text>
            <Text style={{ color: 'white', fontSize: 11 }}>User 1</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mixContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 12,
  },
  mixStyle: {
    width: '31%',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 0,
  },
  mixImageStyle: {
    width: '100%',
    height: 100,
    justifyContent: 'flex-start',
  },
  mixImageOverlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 4 },
  mixInfoStyle: {
    height: 35,
    width: '100%',
    padding: 8,
    backgroundColor: '#535353',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default RecentMixes;
