import React from 'react';
import { StyleSheet, TextInput, Image, View, Text } from 'react-native';

export default class MealItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.mealNumber,
      orderdetail: props.orderdetail,
    };
  }

  handleChangeNumber = num => {
    // 變更餐點金額的數字
    const newNum = num.replace(/\b(0+)/gi, '').replace(/[^\d]+/, ''); //去掉左方多餘的0跟非數字
    const { meal, getIdNum } = this.props;
    this.setState(
      {
        number: newNum,
      },
      () => {
        getIdNum([meal.id, this.state.number]);
      },
    );
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
            keyboardType="number-pad"
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
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 8,
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
    backgroundColor: 'rgba(251,208,121,0.4)',
    textAlign: 'center',
    borderWidth: 1,
    height: 40,
    elevation: 0,
    width: 50,
    borderColor: '#FFE8BF',
    borderRadius: 10,
  },
});
