import React from 'react';
import { ScrollView } from 'react-native';
import MealItem from './MealItem';

class MealList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { meals, orderdetail, getIdNum, mealNumber } = this.props;
    return (
      <ScrollView>
        {meals.map(meal => {
          return (
            <MealItem
              key={meal.id}
              meal={meal}
              orderdetail={orderdetail}
              getIdNum={getIdNum}
              mealNumber={mealNumber[meal.id - 1].num}
            />
          );
        })}
      </ScrollView>
    );
  }
}

export default MealList;
