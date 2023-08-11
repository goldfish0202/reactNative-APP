import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, Button } from 'react-native';

const translateType = type => {
  switch (type) {
    case 'life':
      return '生活';
    case 'work':
      return '工作';
    case 'entertainment':
      return '娛樂';
    default:
      return '無此類別';
  }
};

export default function TodoItem(props) {
  const {
    todo: { id, type, title, subTitle, time, completed },
    onPress,
    updateTodo,
    deleteTodo,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      // 根據完成狀態呈現不同的上框線顏色樣式
      style={[styles.content, completed ? styles.completedBorder : styles.unCompletedBorder]}>
      <View style={styles.todoContent}>
        <View style={styles.imageContent}>
          <Image
            // 根據完成狀態顯示不同的待辦項目圖示
            source={{
              uri: completed
                ? 'https://i.imgur.com/jxsdKdh.png'
                : 'https://i.imgur.com/zrs3alB.png',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.contentView}>
          {/* 根據完成狀態顯示不同的標題樣式 */}
          <Text style={completed ? styles.completedTitle : styles.unCompletedTitle}>{title}</Text>
          <Text>
            {/* 將 type 傳入定義的函示對應顯示中文類型文字 */}
            <Text style={styles.tagText}>{translateType(type)}</Text>
            <Text style={styles.time}> {time}</Text>
          </Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        <View style={styles.buttonView}>
          {!completed && (
            <View style={styles.btn}>
              <Button title="修改" color="#95CACA" onPress={() => updateTodo(props.todo)} />
            </View>
          )}
          <View style={styles.btn}>
            <Button title="刪除" color="#577a9e" onPress={() => deleteTodo(id)} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    margin: '2.5%',
    width: '45%',
    flexDirection: 'row', // 每個 TodoItem 區塊透過水平方向排列
    alignItems: 'center', // 垂直置中
    backgroundColor: '#fff', // 區塊內的背景顏色
    borderTopWidth: 5, // 上框線粗細
    borderRadius: 2, // 框線圓角弧度
    padding: 10, // 區塊四周內距大小
    elevation: 5, // 陰影深淺
  },
  completedBorder: {
    borderTopColor: '#577a9e', // 上框線顏色
  },
  unCompletedBorder: {
    borderTopColor: '#95CACA', // 上框線顏色
  },
  imageContent: {
    flex: 0.1, // 圖示區塊大小
  },
  image: { width: 20, height: 20 }, // 圖示大小
  todoContent: {
    flex: 1, // 待辦內容區塊大小
    flexDirection: 'column',
    justifyContent: 'center', // 待辦內容左右貼齊排列
    alignItems: 'center', // 待辦內容交叉軸置中（垂直方向）
  },
  contentView: {
    flex: 0.8,
    width: '100%',
  },
  unCompletedTitle: {
    color: '#194571',
    fontSize: 20, // 標題文字大小
    fontWeight: 'bold', // 標題文字粗細
  },
  completedTitle: {
    color: '#4c6176',
    fontSize: 20, // 標題文字大小
    fontWeight: 'bold', // 標題文字粗細
    textDecorationLine: 'line-through', // 標題文字加刪除線
    fontStyle: 'italic', // 標題文字加斜體
  },
  subTitle: {
    fontSize: 14, // 子標題文字大小
    color: '#617f9e', // 子標題文字顏色
    paddingTop: 7, // 區塊上下內距大小
  },
  buttonView: {
    flex: 0.1,
    flexDirection: 'row',
  },
  btn: {
    height: 35,
    marginHorizontal: 5,
  },
  tagText: {
    backgroundColor: '#FFFFBB', // 背景顏色
    color: 'black', // 類型文字顏色
    fontSize: 14, // 類型文字大小
  },
  time: {
    color: 'gray', // 時間文字顏色
    paddingTop: 7, // 區塊上下內距大小
    textAlign: 'right', // 靠右對齊
  },
});
