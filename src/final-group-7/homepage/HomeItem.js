import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';

const HomeItem = props => {
  const { home, onPress } = props;

  return (
    <View style={styles.view}>
      <TouchableOpacity
        onPress={() => onPress(home.id)}
        // 根據完成狀態呈現不同的左框線顏色樣式
        style={styles.imageContent}>
        <View>
          <Image
            // 根據完成狀態顯示不同的待辦項目圖示
            source={{
              uri: home.url,
            }}
            style={styles.image}
          />
          <Text style={styles.textCenter}>{home.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
  },
  textCenter: {
    flex: 0.6,
    flexDirection: 'row',
    color: 'black',
    fontSize: 25,
  },
  imageContent: {
    flex: 0.1,
    flexDirection: 'row',
  },
  image: { width: 100, height: 100 },
});

export default HomeItem;
