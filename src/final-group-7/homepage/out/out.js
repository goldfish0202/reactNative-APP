import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Fontisto';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default class mealList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      time: format(new Date().setMinutes(new Date().getMinutes() + 29), 'yyyy/MM/dd HH:mm'),
      status: false, //Picker status
    };
  }

  handleChangeName = text => {
    //更新姓名
    this.setState({
      name: text,
    });
  };

  handleChangePhone = text => {
    //更新電話
    const newText = text.replace(/[^\d]+/, ''); //去掉非數字
    this.setState({
      phone: newText,
    });
  };

  setDatePicker = status => {
    //更新DatePicker狀態
    this.setState({
      status: status,
    });
  };

  handleConfirm = date => {
    const nowDate = new Date().setMinutes(new Date().getMinutes() + 29);
    if (date < nowDate) {
      Alert.alert('請重新選擇取餐時間', '取餐時間至少需要晚於現在時間30分鐘');
      this.setState({
        time: '',
      });
    } else {
      //更新日期時間
      this.setState({
        time: format(date, 'yyyy/MM/dd HH:mm'),
      });
    }
    this.setDatePicker(false);
  };

  render() {
    const { name, phone, time, status } = this.state;
    const { goOutOrder, goOutOrderSelect } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
          <View>
            <View style={styles.item}>
              <Text style={styles.text}>姓名</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={this.handleChangeName}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>電話</Text>
              <TextInput
                style={styles.textInput}
                value={phone}
                keyboardType="number-pad"
                onChangeText={this.handleChangePhone}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>取餐時間</Text>
              <TouchableOpacity
                style={[styles.textInput, { flexDirection: 'row' }]}
                onPress={() => this.setDatePicker(true)}>
                <Icon name={'date'} size={24} style={styles.iconView} />
                <DateTimePickerModal
                  isVisible={status}
                  mode="datetime"
                  minimumDate={new Date()}
                  onConfirm={this.handleConfirm}
                  onCancel={() => this.setDatePicker(false)}
                />
                <Text style={[styles.textInput, { textAlignVertical: 'center' }]}>{time}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={[
                styles.btn,
                !name || !phone ? { backgroundColor: '#D0CFCD' } : { backgroundColor: '#FFCF78' },
              ]}
              disabled={!name || !phone}
              onPress={() => goOutOrderSelect(name, phone)}>
              <Text style={styles.btnText}>查詢</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                !name || !phone || !time
                  ? { backgroundColor: '#D0CFCD' }
                  : { backgroundColor: '#FFCF78' },
              ]}
              disabled={!name || !phone || !time}
              onPress={() => goOutOrder(name, phone, time)}>
              <Text style={styles.btnText}>下一步</Text>
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
    marginVertical: 6,
    padding: 10,
    backgroundColor: '#FFF',
    elevation: 8,
    borderRadius: 12,
  },
  text: {
    flex: 1,
    height: 40,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textInput: {
    flex: 4,
    height: 40,
    borderBottomWidth: 1,
    color: '#000',
    fontSize: 16,
    paddingLeft: 5,
  },
  iconView: {
    color: '#FFB01C',
    textAlignVertical: 'center',
    marginRight: 3,
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
