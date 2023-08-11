import React from 'react';
import { StyleSheet, Linking, TouchableOpacity, View, Image, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HomeDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          id: 1,
          name: 'Leo',
          phone: '0987654321',
          date: '2021/01/06',
          time: '11:30',
          number: '1',
          remark: '無',
        },
        {
          id: 2,
          name: 'Amy',
          phone: '0912345678',
          date: '2021/09/04',
          time: '12:00',
          number: '3',
          remark: '無',
        },
        {
          id: 3,
          name: 'Amy',
          phone: '0912345678',
          date: '2021/11/17',
          time: '15:00',
          number: '6',
          remark: '',
        },
        {
          id: 4,
          name: 'Amy',
          phone: '0912345678',
          date: '2022/01/16',
          time: '22:00',
          number: '5',
          remark: '無',
        },
        {
          id: 5,
          name: 'Leo',
          phone: '0987654321',
          date: '2022/02/02',
          time: '17:30',
          number: '5',
          remark: '',
        },
      ],
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
          { mealid: 1, num: '1', orderid: 0 },
          { mealid: 2, num: '2', orderid: 0 },
          { mealid: 9, num: '2', orderid: 0 },
        ],
        [
          { mealid: 3, num: '5', orderid: 1 },
          { mealid: 9, num: '1', orderid: 1 },
        ],
        [
          { mealid: 4, num: '2', orderid: 2 },
          { mealid: 6, num: '1', orderid: 2 },
          { mealid: 7, num: '4', orderid: 2 },
        ],
      ], //order.id meals.id num
      orders: [
        {
          name: 'Jack',
          orderid: 0,
          phone: '0987654321',
          time: '2021/09/22 12:40',
        },
        {
          name: 'Ivy',
          orderid: 1,
          phone: '0912345678',
          time: '2021/12/28 18:30',
        },
        {
          name: 'Ivy',
          orderid: 2,
          phone: '0912345678',
          time: '2022/01/01 19:20',
        },
      ], //order.id   name phone  time
      inOrderdetail: [
        [
          { mealid: 1, num: '2', orderid: 0 },
          { mealid: 2, num: '1', orderid: 0 },
        ],
        [
          { mealid: 1, num: '2', orderid: 1 },
          { mealid: 8, num: '2', orderid: 1 },
          { mealid: 9, num: '1', orderid: 1 },
        ],
        [
          { mealid: 6, num: '3', orderid: 2 },
          { mealid: 7, num: '5', orderid: 2 },
        ],
      ], //orderid meals.id num tableid
      inOrders: [
        { orderid: 0, time: '2021/09/04 11:50', tableid: '1' },
        { orderid: 1, time: '2021/10/10 17:15', tableid: '10' },
        { orderid: 2, time: '2022/12/25 18:35', tableid: '7' },
      ], //order.id   name phone  time
    };
  }

  handleChangeInOrderdetail = (tableid, o, time) => {
    const { inOrders, inOrderdetail } = this.state;
    const notnum = o.filter(ooo => ooo.num > 0);
    const newInOrderdetail = notnum.map(order => {
      return {
        orderid: inOrders.length,
        mealid: order.mealid,
        num: order.num,
      };
    });
    this.setState({
      inOrderdetail: [...inOrderdetail, newInOrderdetail],
      inOrders: [
        ...inOrders,
        {
          orderid: inOrders.length,
          tableid: tableid,
          time: time,
        },
      ],
    });
  };

  handleChangeOrderdetail = (id, o) => {
    const { orderdetail } = this.state;
    const notnum = o.filter(ooo => ooo.num > 0);
    const neworderdetail = notnum.map(order => {
      return {
        orderid: id,
        mealid: order.mealid,
        num: order.num,
      };
    });
    this.setState({
      orderdetail: [...orderdetail, neworderdetail],
    });
  };

  goOutOrder = (name, phone, time) => {
    const { meals, orderdetail, orders } = this.state;
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

  goOutOrderSelect = (name, phone) => {
    const { meals, orderdetail, orders } = this.state;
    const neworders = orders.filter(o => o.name === name && o.phone === phone);
    const newod = neworders.map(o => {
      return orderdetail.filter(od => od[0].orderid === o.orderid);
    });
    const nullod = newod.filter(n => n.length > 0);
    if ((newod.length === 0) | (nullod.length === 0)) {
      Alert.alert('查無訂單資料', '請確認輸入之姓名電話是否正確!');
    } else {
      Actions.push('outOrderSelect', {
        orderdetail: newod,
        orders: neworders,
        meals: meals,
      });
    }
  };

  addBook = (name1, phone) => {
    Actions.push('BookForm', {
      handleAddBook: this.handleAddBook,
      name1: name1,
      phone: phone,
    });
  };

  selectBook = (name1, phone) => {
    const { books } = this.state;
    const book = books.filter(book => name1 === book.name && phone === book.phone);
    book.length !== 0
      ? Actions.push('BookSelect', {
          handleUpdateBook: this.handleUpdateBook,
          handleDeleteBook: this.handleDeleteBook,
          handlecheckbook: this.handlecheckbook,
          books: book,
          name1: name1,
          phone: phone,
        })
      : Alert.alert('查無訂位資料', '請確認輸入之姓名電話是否正確!');
  };

  handleDeleteBook = (id, name1, phone) => {
    const newbooks = this.state.books.filter(book => book.id !== id);

    this.setState(
      {
        books: newbooks,
      },
      () => {
        const { books } = this.state;
        books.filter(book => book.name === name1 && book.phone === phone).length !== 0
          ? this.selectBook(name1, phone)
          : Actions.popTo('Booking');
      },
    );
  };

  handleUpdateBook = (book1, name1, phone) => {
    const newbooks = this.state.books.map(book => {
      return book.id === book1.id ? book1 : book;
    });

    this.setState(
      {
        books: newbooks,
      },
      () => {
        this.selectBook(name1, phone);
      },
    );
  };

  handleAddBook = (book, name1, phone) => {
    const { books } = this.state;
    this.setState({
      books: [
        ...books,
        {
          id: books.length + 1,
          name: name1,
          phone: phone,
          ...book,
        },
      ],
    });
  };

  handleRedirectHomePage = () => {
    // 若已於餐點列表畫面但再次點擊則僅關閉 Drawer 視窗
    Actions.currentScene !== 'homepage' ? Actions.push('homepage') : Actions.drawerClose();
  };

  handleOpenBook = () => {
    Actions.push('Booking', {
      addBook: this.addBook,
      selectBook: this.selectBook,
    });
  };

  handleOpenIn = () => {
    Actions.push('inOrder', {
      meals: this.state.meals,
      orderdetail: this.state.inOrderdetail,
      handleChangeOrderdetail: this.handleChangeInOrderdetail,
      handleOpenIn: this.handleOpenIn,
    });
  };

  handleOpenOut = () => {
    Actions.push('out', {
      goOutOrder: this.goOutOrder,
      goOutOrderSelect: this.goOutOrderSelect,
    });
  };

  handleOpenTelephone = () => {
    Linking.openURL('tel:0912345678');
  };

  render() {
    return (
      <View style={styles.drawer}>
        <View style={styles.drawTitleView}>
          <Text style={styles.drawTitleText}>高科小館</Text>
          <TouchableOpacity onPress={() => Actions.drawerClose()}>
            <Image source={{ uri: 'https://i.imgur.com/7TQkIts.png' }} style={styles.cancelImage} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handleRedirectHomePage} style={styles.drawerItemView}>
          <MCIcon name={'home'} size={30} style={styles.icon} />
          <Text style={styles.drawerItemText}>首頁</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={this.handleOpenBook} style={styles.drawerItemView}>
          <MCIcon name={'calendar-clock'} size={30} style={styles.icon} />
          <Text style={styles.drawerItemText}>訂位</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={this.handleOpenIn} style={styles.drawerItemView}>
          <MCIcon name={'silverware-variant'} size={30} style={styles.icon} />
          <Text style={styles.drawerItemText}>內用點餐</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={this.handleOpenOut} style={styles.drawerItemView}>
          <MCIcon name={'shopping-outline'} size={30} style={styles.icon} />
          <Text style={styles.drawerItemText}>外帶自取</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={this.handleOpenTelephone} style={styles.drawerItemView}>
          <MCIcon name={'phone'} size={30} style={styles.icon} />
          <Text style={styles.drawerItemText}>聯絡我們</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    margin: 10,
  },
  drawTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  drawTitleText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  cancelImage: {
    width: 20,
    height: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  drawerItemView: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  drawerItemText: {
    fontSize: 16,
    textAlignVertical: 'center',
  },
  icon: {
    margin: 1,
    marginRight: 10,
    padding: 1,
    color: '#FFCF78',
  },
});
