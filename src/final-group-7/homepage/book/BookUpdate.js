import React from 'react';
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
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Fontisto';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default class BookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.book.id,
      name: this.props.book.name,
      phone: this.props.book.phone,
      date: this.props.book.date,
      time: this.props.book.time,
      number: this.props.book.number,
      remark: this.props.book.remark,
      status: false,
      hour: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
      minute: ['00', '30'],
    };
  }

  handleChangeTime = text => {
    //更新時間
    this.setState({
      time: text,
    });
  };

  handleChangeNumber = text => {
    //更新人數
    const newText = text.replace(/[^\d]+/, ''); //去掉非數字
    this.setState({
      number: newText,
    });
  };

  handleChangeRemark = text => {
    //更新備註
    this.setState({
      remark: text,
    });
  };

  handleUpdatePress = () => {
    //修改訂位books
    const { handleUpdateBook, name1, phone } = this.props;
    handleUpdateBook(this.state, name1, phone); //將修改的訂位(books)資料更新
  };

  setDatePicker = status => {
    //更新DatePicker狀態
    this.setState({
      status: status,
    });
  };

  handleConfirm = date => {
    const bookDate = new Date().setDate(new Date().getDate() + 1);
    if (date < bookDate) {
      Alert.alert('請重新選擇訂位日期', '訂位日期至少需要提前1天');
      this.setState({
        date: this.props.book.date,
      });
    } else {
      //更新日期
      this.setState({
        date: format(date, 'yyyy/MM/dd'),
      });
    }
    this.setDatePicker(false);
  };

  render() {
    const { date, time, number, remark, status, hour, minute } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
          <View>
            <View style={styles.item}>
              <Text style={styles.text}>日期：</Text>
              <TouchableOpacity
                style={[styles.textInput, { flexDirection: 'row' }]}
                onPress={() => this.setDatePicker(true)}>
                <Icon name={'date'} size={24} style={styles.iconView} />
                <DateTimePickerModal
                  isVisible={status}
                  mode="date"
                  onConfirm={this.handleConfirm}
                  onCancel={() => this.setDatePicker(false)}
                />
                <Text style={[styles.textInput, { textAlignVertical: 'center' }]}>{date}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>時間：</Text>
              <Picker
                style={styles.textInput}
                selectedValue={time}
                onValueChange={this.handleChangeTime}>
                {hour.map(h =>
                  minute.map(m => {
                    return <Picker.Item label={h + ':' + m} value={h + ':' + m} />;
                  }),
                )}
              </Picker>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>人數：</Text>
              <TextInput
                value={number}
                keyboardType="phone-pad"
                onChangeText={this.handleChangeNumber}
                style={styles.textInput}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>備註：</Text>
              <TextInput
                value={remark}
                multiline
                onChangeText={this.handleChangeRemark}
                style={styles.textInput}
              />
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  !date || !time || !number
                    ? { backgroundColor: '#D0CFCD' }
                    : { backgroundColor: '#FFCF78' },
                ]}
                disabled={!date || !time || !number}
                onPress={this.handleUpdatePress}>
                <Text style={styles.btnText}>確認</Text>
              </TouchableOpacity>
            </View>
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
    marginVertical: 8,
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
    flex: 4.5,
    height: 40,
    borderBottomWidth: 1,
    color: '#000',
    fontSize: 16,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  iconView: {
    color: '#FFCF78',
    textAlignVertical: 'center',
    marginRight: 10,
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
