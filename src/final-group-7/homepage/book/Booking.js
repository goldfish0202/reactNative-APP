import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
export default class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name1: '',
      phone: '',
    };
  }

  handleChangeName = text => {
    //更新名字
    this.setState({
      name1: text,
    });
  };

  handleChangePhone = text => {
    //更新電話
    const newText = text.replace(/[^\d]+/, ''); //去掉非數字
    this.setState({
      phone: newText,
    });
  };

  render() {
    const { name1, phone } = this.state;
    const { addBook, selectBook } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
          <View style={styles.item}>
            <Text style={styles.text}>姓名：</Text>
            <TextInput
              type="text"
              value={name1}
              onChangeText={this.handleChangeName}
              style={styles.textInput}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>電話：</Text>
            <TextInput
              keyboardType="phone-pad"
              value={phone}
              onChangeText={this.handleChangePhone}
              style={styles.textInput}
            />
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={[
                styles.btn,
                !name1 || !phone ? { backgroundColor: '#D0CFCD' } : { backgroundColor: '#FFCF78' },
              ]}
              disabled={!name1 || !phone}
              onPress={() => selectBook(name1, phone)}>
              <Text style={styles.btnText}>查詢訂位</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                !name1 || !phone ? { backgroundColor: '#D0CFCD' } : { backgroundColor: '#FFCF78' },
              ]}
              disabled={!name1 || !phone}
              onPress={() => addBook(name1, phone)}>
              <Text style={styles.btnText}>線上訂位</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    padding: 10,
    backgroundColor: '#FFF',
    elevation: 8,
    borderRadius: 12,
  },
  text: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    fontSize: 16,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    flex: 4,
    borderRadius: 8,
    color: '#000',
    marginLeft: -15,
    fontSize: 16,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  btn: {
    flex: 0.5,
    padding: 5,
    paddingVertical: 12,
    marginHorizontal: 20,
    elevation: 8,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
  },
});
