import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const NavBar = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.navbarContainer}>
        <Image source={props.image} style={styles.navbarImageStyle} />
        {props.categoryList.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedIndex(index)}
            style={[
              styles.navbarButtonStyle,
              selectedIndex === index && styles.navbarButtonStyleSelected,
            ]}
          >
            <Text style={styles.navbarButtonTextStyle}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 15,
    gap: 5,
    backgroundColor: 'black',
  },
  navbarImageStyle: { height: 40, width: 40, borderRadius: 48 },
  navbarButtonStyle: {
    backgroundColor: '#535353',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 30,
  },
  navbarButtonStyleSelected: {
    backgroundColor: '#1DB954',
  },
  navbarButtonTextStyle: {
    color: 'white',
    marginLeft: 8,
    marginRight: 8,
  },
});

export default NavBar;
