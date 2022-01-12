import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = (prop) => {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imagebox}>
        <Image
          style={styles.image}
          source={{uri: uploadsUrl + prop.singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listTitle}>{prop.singleMedia.title}</Text>
        <Text>{prop.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  imagebox: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 6,
  },
  textbox: {
    flex: 2,
    padding: 10,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
});

ListItem.prototype = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
