import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import SelectItem from './SelectItem';

export default class outOrderSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { meals, orderdetail, orders } = this.props;
    return (
      <View style={styles.selectView}>
        <View style={styles.inf}>
          <Text style={styles.infText}>姓名：{orders[0].name}</Text>
          <Text style={styles.infText}>電話：{orders[0].phone}</Text>
        </View>
        <ScrollView>
          {orderdetail.map(od => {
            const t = orders.filter(o => od[0][0].orderid === o.orderid)[0].time;
            return <SelectItem key={od[0][0].orderid} orderdetail={od[0]} time={t} meals={meals} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectView: {
    padding: 20,
  },
  inf: {
    flexDirection: 'row',
  },
  infText: {
    marginRight: 30,
    fontSize: 16,
  },
});
