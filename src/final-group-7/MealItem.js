import React from 'react';
import { StyleSheet, TextInput, Image, View, Text } from 'react-native';

export default class MealItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '0',
      orderdetail: props.orderdetail,
    };
  }

  // 變更餐點金額的數字
  handleChangeNumber = num => {
    const { meal, orders, getIdNum } = this.props;
    this.setState(
      {
        number: num,
      },
      () => {
        getIdNum([meal.id, this.state.number]);
      },
    );
    /*this.setState({
      orderid: null,
      mealid: meal.id,
      number: num,
    })*/
  };

  render() {
    const { number } = this.state;
    const { meal } = this.props;

    return (
      <View style={styles.mealItemView}>
        <Image style={styles.img} source={{ uri: meal.url }} />
        <View style={styles.mealContent}>
          <View style={styles.mealNamePrice}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.mealPrice}>${meal.price}</Text>
          </View>
          <Text style={styles.mealDesc}>{meal.desc}</Text>
        </View>
        <View style={styles.mealNumView}>
          <TextInput
            style={styles.mealNumTextInput}
            value={number}
            onChangeText={this.handleChangeNumber}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mealItemView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
  },
  img: {
    width: 100,
    height: 100,
  },
  mealContent: {
    flex: 4,
    marginLeft: 10,
  },
  mealNamePrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealName: {
    fontWeight: 'bold',
    textAlign: 'left',
    paddingVertical: 3,
  },
  mealPrice: {
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 5,
  },
  mealDesc: {},
  mealNumView: {
    flex: 1,
    alignItems: 'center',
  },
  mealNumTextInput: {
    backgroundColor: 'white',
    textAlign: 'center',
  },
});
