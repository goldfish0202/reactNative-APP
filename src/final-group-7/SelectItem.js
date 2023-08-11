import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, Button } from 'react-native';

export default function SelectItem(props) {
  const { orderdetail, time, meals } = props;
  var total = 0;
  return (
    <View style={styles.itemView}>
      <Text style={[styles.time, styles.infText]}>取餐時間 {time}</Text>
      {/* //算total */}
      <View style={styles.details}>
        {orderdetail.map(od => {
          return (
            (total += meals[od.mealid - 1].price * od.num),
            (
              <View key={od.orderid + od.mealid} style={styles.detailView}>
                <Text style={[styles.meal, styles.infText]}>{meals[od.mealid - 1].name}</Text>
                <Text style={[styles.price, styles.infText]}>${meals[od.mealid - 1].price}</Text>
                <Text style={[styles.num, styles.infText]}>x{od.num}</Text>
                <Text style={[styles.total, styles.infText]}>
                  ${meals[od.mealid - 1].price * od.num}
                </Text>
              </View>
            )
          );
        })}
      </View>
      <Text style={[styles.sum, styles.infText]}>總金額 {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemView: {
    flex: 1,
    backgroundColor: '#DFD8D5',
    margin: 10,
    padding: 10,
    borderRadius: 15,
  },
  time: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'gray',
    paddingBottom: 5,
    marginBottom: 5,
  },
  details: {
    flex: 1,
  },
  detailView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infText: {
    fontSize: 16,
    paddingTop: 3,
  },
  meal: {
    flex: 1,
  },
  price: {
    flex: 1,
    textAlign: 'center',
  },
  num: {
    flex: 1,
    textAlign: 'center',
  },
  total: {
    flex: 1,
    textAlign: 'right',
  },
  sum: {
    textAlign: 'right',
    borderTopWidth: 1.5,
    borderTopColor: 'gray',
    marginTop: 5,
  },
});
