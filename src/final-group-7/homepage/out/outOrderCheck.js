import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class outOrderCheck extends Component {
  constructor(props) {
    super(props);
  }

  goOut = () => {
    const { orders, mealNumber, handleChangeOrderdetail } = this.props;
    Actions.popTo('out');
    //完成點餐回到外帶點餐第一頁(out.js)
    handleChangeOrderdetail(orders[orders.length - 1].orderid, mealNumber);
    //將外帶orderdetail寫入
  };

  render() {
    const { meals, orders, mealNumber } = this.props;
    var total = 0;
    return (
      <View style={styles.checkView}>
        <Text style={styles.checkTitle}>請確認所選餐點</Text>
        <View style={styles.checkContent}>
          {mealNumber.map(m => {
            return (
              (total += meals[m.mealid - 1].price * m.num),
              m.num > 0 && (
                <View key={m.mealid} style={styles.checkMealView}>
                  <Text style={styles.checkMealText}>{meals[m.mealid - 1].name}</Text>
                  <Text style={styles.checkMealText}>${meals[m.mealid - 1].price}</Text>
                  <Text style={styles.checkMealText}>X{m.num}</Text>
                  <Text style={[styles.checkMealText]}>${meals[m.mealid - 1].price * m.num}</Text>
                </View>
              )
            );
          })}
        </View>
        <View style={styles.checkInf}>
          <View>
            <Text style={styles.infText}>姓名：{orders[orders.length - 1].name}</Text>
            <Text style={styles.infText}>電話：{orders[orders.length - 1].phone}</Text>
            <Text style={styles.infText}>取餐時間：{orders[orders.length - 1].time}</Text>
          </View>
          <Text style={styles.infText}>總金額 ${total}</Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Actions.popTo('out');
            }}>
            <Text style={styles.btnText}>取消訂單</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.goOut}>
            <Text style={styles.btnText}>送出訂單</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkView: {
    flex: 1,
    padding: 20,
  },
  checkTitle: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
  },
  checkContent: {
    flex: 7,
    padding: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF3DE',
    elevation: 8,
    borderRadius: 8,
  },
  checkInf: {
    flex: 2,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
  },
  checkMealView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkMealText: {
    fontSize: 14,
    width: 100,
  },
  infText: {
    fontSize: 16,
    paddingTop: 3,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    flex: 1,
    padding: 15,
    margin: 20,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: '#FFCF78',
  },
  btnText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
  },
});
