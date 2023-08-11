import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import MealList from './MealList';
import { Actions } from 'react-native-router-flux';

export default class outOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      status: '全部', //全部 主食 單點 點心 飲料
      mealtype: ['全部', '主食', '單點', '點心', '飲料'],
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      title: '點餐',
    });
  }

  getIdNum = value => {
    //更新菜單上各品項點選數量
    const newMealNumber = this.state.mealNumber.map(m => {
      return m.mealid === value[0]
        ? {
            ...m,
            num: value[1],
          }
        : m;
    });
    this.setState({
      mealNumber: newMealNumber,
    });
  };

  goOutOrderCheck = () => {
    //前往外帶點餐最終確認頁面(outOrderCheck.js)
    const { meals, orderdetail, orders, handleChangeOrderdetail } = this.props;
    Actions.push('outOrderCheck', {
      meals: meals,
      orderdetail: orderdetail,
      orders: orders,
      mealNumber: this.state.mealNumber,
      handleChangeOrderdetail: handleChangeOrderdetail,
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
    const { mealNumber, status, mealtype } = this.state;
    const newMeals = status === '全部' ? meals : meals.filter(meal => meal.type === status);
    //過濾出所選類別的菜單資料
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
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
              onPress={this.goOutOrderCheck}
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
    //flex: 0.1,
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
