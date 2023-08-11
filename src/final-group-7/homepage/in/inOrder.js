import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import MealList from '../out/MealList';
import { Actions } from 'react-native-router-flux';
import { Picker } from '@react-native-picker/picker';

export default class inOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: '1',
      tablevalue: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], //所有桌號
      mealNumber: [
        { mealid: 1, num: '0' },
        { mealid: 2, num: '0' },
        { mealid: 3, num: '0' },
        { mealid: 4, num: '0' },
        { mealid: 5, num: '0' },
        { mealid: 6, num: '0' },
        { mealid: 7, num: '0' },
        { mealid: 8, num: '0' },
        { mealid: 9, num: '0' },
        { mealid: 10, num: '0' },
      ], //mealid, num
      status: '全部',
      mealtype: ['全部', '主食', '單點', '點心', '飲料'],
    };
  }

  handleChangeType = value => {
    //更新所選菜單類別
    this.setState({
      table: value,
    });
  };

  getIdNum = value => {
    //更新菜單上各品項點選數量
    const newMealNumber = this.state.mealNumber.map(m => {
      return m.mealid === value[0]
        ? {
            ...m,
            num: value[1].replace(/\b(0+)/gi, ''), //去掉左方多餘的0
          }
        : m;
    });
    this.setState({
      mealNumber: newMealNumber,
    });
  };

  goInOrderCheck = () => {
    //前往內用點餐最終確認頁面(inOrderCheck.js)
    const { meals, orderdetail, handleChangeOrderdetail, handleOpenIn } = this.props;
    Actions.push('inOrderCheck', {
      meals: meals,
      orderdetail: orderdetail,
      mealNumber: this.state.mealNumber,
      handleChangeOrderdetail: handleChangeOrderdetail,
      handleOpenIn: handleOpenIn,
      changeType: this.changeType,
      table: this.state.table,
    });
  };

  changeType = s => {
    //更新所選菜單類別
    this.setState({
      status: s,
    });
  };

  render() {
    const { meals, orderdetail, orders } = this.props;
    const { mealNumber, status, tablevalue, table, mealtype } = this.state;
    const newMeals = status === '全部' ? meals : meals.filter(meal => meal.type === status);
    //過濾出所選類別的菜單資料
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container} keyboardShouldPersistTaps={false}>
          <View style={styles.item}>
            <Text style={styles.text}>桌號</Text>
            <Picker
              style={styles.textInput}
              selectedValue={table}
              mode="dropdown"
              onValueChange={this.handleChangeType}>
              {tablevalue.map(t => (
                <Picker.Item label={t} value={t} />
              ))}
            </Picker>
          </View>
          <View style={styles.btnView}>
            {mealtype.map(t => {
              return (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.btn,
                    status === t ? { backgroundColor: '#FFCF78' } : { backgroundColor: '#D0CFCD' },
                  ]}
                  onPress={() => {
                    this.changeType(t);
                  }}>
                  <Text style={styles.btnText}>{t}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.mealListView}>
            <MealList
              meals={newMeals}
              orderdetail={orderdetail}
              orders={orders}
              getIdNum={this.getIdNum}
              mealNumber={mealNumber}
            />
          </View>
          <View style={[styles.btnView, { justifyContent: 'flex-end' }]}>
            <TouchableOpacity
              style={[
                styles.btn,
                this.state.mealNumber.filter(n => n.num > 0).length === 0
                  ? { backgroundColor: '#D0CFCD' }
                  : { backgroundColor: '#FFCF78' },
              ]}
              onPress={this.goInOrderCheck}
              disabled={this.state.mealNumber.filter(n => n.num > 0).length === 0 ? true : false}>
              <Text style={styles.btnText}>確定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 30,
  },
  btn: {
    width: 50,
    margin: 5,
    alignItems: 'center',
    borderRadius: 15,
  },
  btnText: {
    padding: 8,
    color: '#fff',
    fontSize: 16,
  },
  mealListView: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 30,
    paddingLeft: 20,
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
  },
});
