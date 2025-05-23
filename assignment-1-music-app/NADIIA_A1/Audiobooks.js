import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Audiobooks = (props) => {
  return (
    <View style={styles.audiobookContainer}>
      {[...Array(props.count)].map((_, index) => (
        <TouchableOpacity key={index} style={styles.audiobookStyle}>
          <Image source={props.image} style={styles.audiobookImageStyle} />
          <View style={styles.audiobookInfoStyle}>
            <Text style={{ color: '#1db954', fontSize: 11 }}>
              Included in premium
            </Text>
            <Text
              style={{ color: 'white', fontSize: 11 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.books[index].title}
            </Text>
            <Text
              style={{ color: '#b3b3b3', fontSize: 11 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.books[index].author}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  audiobookContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 12,
    marginBottom: 55,
  },
  audiobookStyle: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 0,
  },
  audiobookImageStyle: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
  },
  audiobookInfoStyle: {
    height: 75,
    width: '100%',
    padding: 8,
    backgroundColor: '#535353',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default Audiobooks;
