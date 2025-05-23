import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FavoritePlaylists = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return (
    <View style={styles.playlistContainer}>
      {[...Array(props.count)].map((_, index) => (
        <TouchableOpacity
          onPress={() => setSelectedIndex(index)}
          key={index}
          style={styles.playlistStyle}
        >
          <Image source={props.image} style={styles.playlistImageStyle} />
          <View>
            <Text style={styles.playlistTextStyle}>
              {props.titleList[index]}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  playlistContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 12,
  },
  playlistStyle: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#535353',
    height: 60,
    borderRadius: 8,
  },
  playlistImageStyle: {
    height: 50,
    width: 50,
    borderRadius: 10,
    margin: 5,
  },
  playlistTextStyle: {
    color: 'white',
    marginLeft: 5,
    fontSize: 11,
  },
});

export default FavoritePlaylists;
