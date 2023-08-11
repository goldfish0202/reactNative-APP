import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns'; // npm install date-fns

export default class inOrderCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: format(new Date(), 'yyyy/MM/dd HH:mm'),
    };
  }
  goInOrder = () => {
    const { table, mealNumber, handleChangeOrderdetail, handleOpenIn } = this.props;
    const { time } = this.state;
    handleOpenIn();
    //完成點餐回到內用點餐第一頁(inOrder.js)
    handleChangeOrderdetail(table, mealNumber, time);
    //將內用orderdetail寫入
  };
  render() {
    const { meals, mealNumber, table, handleOpenIn } = this.props;
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
            <Text style={styles.infText}>桌號：{table}</Text>
            <Text style={styles.infText}>點餐時間：{this.state.time}</Text>
          </View>
          <Text style={styles.infText}>總金額 ${total}</Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              handleOpenIn();
            }}>
            <Text style={styles.btnText}>取消訂單</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.goInOrder}>
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
    elevation: 8,
    borderRadius: 8,
    backgroundColor: '#FFCF78',
  },
  btnText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
  },
});
