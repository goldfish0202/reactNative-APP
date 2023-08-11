import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class mealList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [
        {
          id: 1,
          name: '日式拉麵',
          price: 350,
          url: 'https://i.imgur.com/1ie8Pus.jpeg',
          desc: '加入大蒜熬煮出甘美鮮郁的濃厚湯頭，融入細緻而出色的鹽味拉麵！',
          type: '主食',
        },
        {
          id: 2,
          name: '親子丼',
          price: 280,
          url: 'https://i.imgur.com/UE1N5dF.jpeg',
          desc: '雞肉、雞蛋、洋蔥加入特製醬料拌炒，鹹甜風味與滑嫩口感，和白飯是絕佳組合',
          type: '主食',
        },
        {
          id: 3,
          name: '烏龍麵',
          price: 180,
          url: 'https://i.imgur.com/s6AdVb2.jpeg',
          desc: '特調濃湯底、口味香濃不死鹹，配上Ｑ彈烏龍麵條，不同凡響的美味！',
          type: '主食',
        },
        {
          id: 4,
          name: '牛肉壽喜燒',
          price: 400,
          url: 'https://i.imgur.com/kbeNHLJ.jpeg',
          desc: '牛肉肉質緊實不油膩，肉片吸附滿滿野菜的甜味與關東風味的醬汁，口味鮮甜入口即化滿嘴滿足的滋味',
          type: '主食',
        },
        {
          id: 5,
          name: '日式炸豬排',
          price: 250,
          url: 'https://i.imgur.com/vTUzFiQ.jpeg',
          desc: '鹹甜醬汁搭配具嚼勁的大里肌肉炸豬排，淋上雞蛋一起烹煮，口感豐富下飯',
          type: '單點',
        },

        {
          id: 6,
          name: '玉子燒',
          price: 80,
          url: 'https://i.imgur.com/Iw1FAsq.jpeg',
          desc: '鬆、軟、厚的香甜蛋燒。',
          type: '點心',
        },
        {
          id: 7,
          name: '茶碗蒸',
          price: 80,
          url: 'https://i.imgur.com/1uQRTpg.jpeg',
          desc: '鮮甜柴魚高湯配上香菇、雞腿肉，口感滑潤好滋味',
          type: '點心',
        },
        {
          id: 8,
          name: '蒲燒鰻',
          price: 250,
          url: 'https://i.imgur.com/sllXuR9.jpeg',
          desc: '鹹甜醬汁搭配具嚼勁的大里肌肉炸豬排，淋上雞蛋一起烹煮，口感豐富下飯',
          type: '單點',
        },
        {
          id: 9,
          name: '冬瓜茶',
          price: 50,
          url: 'https://i.imgur.com/FLmK1VH.jpeg',
          desc: '遵循古法製造，甜而不膩的冬瓜清香，為最佳解燥消腫的養生茶',
          type: '飲料',
        },
        {
          id: 10,
          name: '紅茶',
          price: 50,
          url: 'https://i.imgur.com/S6nh4WU.jpeg',
          desc: '茶湯呈現典雅金紅色，茶香中帶有淡淡薄荷肉桂香氣',
          type: '飲料',
        },
      ],
      orderdetail: [
        [
          { mealid: 1, num: '10', orderid: 0 },
          { mealid: 2, num: '5', orderid: 0 },
        ],
        [
          { mealid: 3, num: '50', orderid: 1 },
          { mealid: 9, num: '100', orderid: 1 },
        ],
        [
          { mealid: 6, num: '5', orderid: 2 },
          { mealid: 7, num: '10', orderid: 2 },
        ],
      ], //order.id meals.id num
      orders: [
        { name: '1', orderid: 0, phone: '1', time: '1' },
        { name: '2', orderid: 1, phone: '2', time: '2' },
        { name: '2', orderid: 2, phone: '2', time: '3' },
      ], //order.id   name phone  time
      name: '',
      phone: '',
      time: '',
    };
  }

  handleChangeOrderdetail = (id, o) => {
    const { orderdetail } = this.state;
    const notnum = o.filter(ooo => ooo.num !== 0);
    const neworderdetail = notnum.map(order => {
      return {
        orderid: id,
        mealid: order.mealid,
        num: order.num,
      };
    });
    this.setState({
      orderdetail: [...orderdetail, neworderdetail],
      name: '',
      phone: '',
      time: '',
    });
  };

  goOutOrder = () => {
    const { meals, orderdetail, orders, name, phone, time } = this.state;
    this.setState(
      {
        orders: [
          ...this.state.orders,
          {
            orderid: orders.length,
            name: name,
            phone: phone,
            time: time,
          },
        ],
      },
      () => {
        Actions.push('outOrder', {
          meals: meals,
          orderdetail: orderdetail,
          orders: this.state.orders,
          handleChangeOrderdetail: this.handleChangeOrderdetail,
        });
      },
    );
  };

  goOutOrderSelect = () => {
    const { meals, orderdetail, orders, name, phone } = this.state;
    const neworders = orders.filter(o => o.name === name && o.phone === phone);
    const newod = neworders.map(o => {
      return orderdetail.filter(od => od[0].orderid === o.orderid);
    });
    if (newod.length === 0) {
      Alert.alert('查無訂單資料', '請確認輸入之姓名電話是否正確!');
      this.setState({
        name: '',
        phone: '',
        time: '',
      });
    } else {
      Actions.push('outOrderSelect', {
        orderdetail: newod,
        orders: neworders,
        meals: meals,
      });
    }
  };

  handleChangeName = text => {
    this.setState({
      name: text,
    });
  };

  handleChangePhone = text => {
    this.setState({
      phone: text,
    });
  };

  handleChangeTime = text => {
    this.setState({
      time: text,
    });
  };

  render() {
    //console.log(this.state.orders);
    const { meals, name, phone, time } = this.state;
    return (
      <View style={styles.outView}>
        <View>
          <View style={styles.item}>
            <Text style={styles.text}>姓名</Text>
            <TextInput style={styles.textInput} value={name} onChangeText={this.handleChangeName} />
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>電話</Text>
            <TextInput
              style={styles.textInput}
              value={phone}
              onChangeText={this.handleChangePhone}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>取餐時間</Text>
            <TextInput style={styles.textInput} value={time} onChangeText={this.handleChangeTime} />
          </View>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={[
              styles.btn,
              !name || !phone ? { backgroundColor: '#D0CFCD' } : { backgroundColor: 'lightblue' },
            ]}
            disabled={!name || !phone}
            onPress={this.goOutOrderSelect}>
            <Text style={styles.btnText}>查詢</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              !name || !phone || !time
                ? { backgroundColor: '#D0CFCD' }
                : { backgroundColor: 'lightblue' },
            ]}
            disabled={!name || !phone || !time}
            onPress={this.goOutOrder}>
            <Text style={styles.btnText}>下一步</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outView: {
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
  },
  text: {
    flex: 1,
    fontWeight: 'bold',
    //alignSelf: 'flex-end',
  },
  textInput: {
    flex: 4.5,
    height: 40,
    borderBottomWidth: 1,
    marginLeft: 15,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  btn: {
    padding: 5,
  },
  btnText: {
    color: '#fff',
  },
});
