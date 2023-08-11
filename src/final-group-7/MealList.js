import React from 'react';
import { ScrollView } from 'react-native';
import MealItem from './MealItem';

class MealList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { meals, orderdetail, getIdNum } = this.props;
    return (
      <ScrollView>
        {meals.map(meal => {
          return (
            <MealItem key={meal.id} meal={meal} orderdetail={orderdetail} getIdNum={getIdNum} />
          );
        })}
      </ScrollView>
    );
  }
}

export default MealList;
