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
    marginHorizontal: 10,
    marginBottom: 5,
  },
  imagebox: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 5,
  },
  textbox: {
    flex: 1,
    padding: 10,
  },
  listTitle: {
    color: '#e65',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 15,
  },
});

ListItem.prototype = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
