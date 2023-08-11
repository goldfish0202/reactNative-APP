import React from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native';

const HomeDetail = props => {
  const { home } = props;

  return (
    <View>
      <Image style={styles.image} source={{ uri: home.url }} />
      <View style={styles.homeContent}>
        <Text style={styles.homeName}>{home.name}</Text>
        <Text style={styles.homesubname}>{home.subname}</Text>
        <Text style={styles.homeDesc}>{home.desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
    resizeMode: 'center',
  },
  homeContent: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  homeName: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center',
    backgroundColor: '#FFB01C',
    elevation: 5,
    borderRadius: 5,
  },
  homesubname: {
    fontSize: 20,
    color: 'gray',
    borderRadius: 8,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  homeDesc: {
    fontSize: 20,
    color: 'black',
    borderRadius: 8,
    backgroundColor: '#FFECC9',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    elevation: 5,
  },
});

export default HomeDetail;
