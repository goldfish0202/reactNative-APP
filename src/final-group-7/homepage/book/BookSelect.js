import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BookItem from './BookItem';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
  }

  checkbook = () => {
    Actions.popTo('Booking'); //跳轉訂位畫面(Booking);
  };

  render() {
    const { handleDeleteBook, handleUpdateBook, name1, phone, books } = this.props;
    return (
      <View style={styles.view}>
        <ScrollView>
          <View>
            <View style={styles.item}>
              <Text style={styles.text}>姓名：{name1}</Text>
              <Text style={styles.text}>電話：{phone}</Text>
            </View>
            <View style={styles.bookItem}>
              {books.map(book => (
                <BookItem
                  key={book.id}
                  book={book}
                  name1={name1}
                  phone={phone}
                  handleDeleteBook={handleDeleteBook}
                  handleUpdateBook={handleUpdateBook}
                />
              ))}
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity style={styles.btn} onPress={this.checkbook}>
                <Text style={styles.btnText}>確認</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 15,
    marginTop: -8,
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  text: {
    fontWeight: 'bold',
    marginRight: 30,
    fontSize: 16,
  },
  bookItem: {
    marginHorizontal: 10,
  },
  btnView: {
    flex: 1,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  btn: {
    flex: 0.4,
    paddingVertical: 15,
    elevation: 8,
    borderRadius: 8,
    backgroundColor: '#FFCF78',
  },
  btnText: {
    flex: 1,
    color: '#FFF',
    alignSelf: 'center',
    fontSize: 18,
  },
});
