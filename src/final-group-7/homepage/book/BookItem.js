import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { format } from 'date-fns';
import FIcon from 'react-native-vector-icons/Feather';
import AIcon from 'react-native-vector-icons/AntDesign';

export default class TodoUpdate extends React.Component {
  constructor(props) {
    super(props);
  }

  updatebook = () => {
    //修改訂位books資料
    const { handleUpdateBook, book, name1, phone } = this.props;
    Actions.BookUpdate({
      handleUpdateBook: handleUpdateBook,
      book: book,
      name1: name1,
      phone: phone,
    }); //跳轉訂位修改畫面(BookUpdate.js)
  };

  deletebook = () => {
    //刪除訂位books資料
    const { book, name1, phone, handleDeleteBook } = this.props;
    Alert.alert(
      '刪除',
      '確認是否刪除此項目',
      [
        { text: '取消', onPress: () => {}, style: 'cancel' },
        { text: '確認', onPress: () => handleDeleteBook(book.id, name1, phone) }, //將刪除的訂位(books)資料移除
      ],
      { cancelable: true },
    );
  };

  render() {
    const {
      book: { date, time, number, remark },
    } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.view}>
          <View style={styles.todoContent}>
            <View style={styles.titileView}>
              <Text style={styles.subTitle}>{date}</Text>
              <Text style={styles.subTitle}>{time}</Text>
              <Text style={[styles.subTitle, styles.numTitle]}> {number}人</Text>
            </View>
            <Text style={styles.subTitle2}>備註：{remark}</Text>
          </View>
          {format(new Date().setDate(new Date().getDate() + 1), 'yyyy/MM/dd') > date || ( //日期小於今天日期則無法修改和刪除
            <View>
              <TouchableOpacity style={styles.btn} onPress={this.updatebook}>
                <FIcon name={'edit'} size={16} color={'lightblue'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={this.deletebook}>
                <AIcon name={'delete'} size={16} color={'rgb(223,169,155)'} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3DE',
    borderRadius: 8,
    marginVertical: 5,
    padding: 12,
    elevation: 5,
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoContent: {
    flex: 0.9,
    justifyContent: 'space-between',
  },
  titileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTitle: {
    fontSize: 16,
    padding: 8,
  },
  subTitle2: {
    fontSize: 16,
    paddingLeft: 8,
  },
  numTitle: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    width: 78,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  btn: {
    padding: 5,
    marginLeft: -25,
    borderRadius: 20,
  },
  btnText: {
    color: '#fff',
  },
});
