import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MealList from './MealList';
import { Actions } from 'react-native-router-flux';

export default class outOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealNumber: [
        { mealid: 1, num: 0 },
        { mealid: 2, num: 0 },
        { mealid: 3, num: 0 },
        { mealid: 4, num: 0 },
        { mealid: 5, num: 0 },
        { mealid: 6, num: 0 },
        { mealid: 7, num: 0 },
        { mealid: 8, num: 0 },
        { mealid: 9, num: 0 },
        { mealid: 10, num: 0 },
      ], //mealid, num
      status: '全部',
    };
  }
  componentDidMount() {
    this.props.navigation.setParams({
      title: '點餐',
    });
  }
  getIdNum = value => {
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
    this.setState({
      status: s,
    });
  };

  render() {
    const { meals, orderdetail, orders } = this.props;
    const { status } = this.state;
    const newMeals = status === '全部' ? meals : meals.filter(meal => meal.type === status);
    return (
      <View style={styles.container}>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.changeType('全部');
            }}>
            <Text style={styles.btnText}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.changeType('主食');
            }}>
            <Text style={styles.btnText}>主食</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.changeType('單點');
            }}>
            <Text style={styles.btnText}>單點</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.changeType('點心');
            }}>
            <Text style={styles.btnText}>點心</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.changeType('飲料');
            }}>
            <Text style={styles.btnText}>飲料</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mealListView}>
          <MealList
            meals={newMeals}
            orderdetail={orderdetail}
            orders={orders}
            getIdNum={this.getIdNum}
          />
        </View>
        <View style={[styles.btnView, { justifyContent: 'flex-end' }]}>
          <TouchableOpacity style={styles.btn} onPress={this.goOutOrderCheck}>
            <Text style={styles.btnText}>確定</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  btn: {
    width: 50,
    margin: 5,
    alignItems: 'center',
  },
  btnText: {
    padding: 8,
    backgroundColor: '#cccccc',
    color: '#fff',
    fontSize: 16,
  },
  mealListView: {
    flex: 0.8,
  },
});
