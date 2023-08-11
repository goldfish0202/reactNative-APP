import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const Routes = () => {
  return (
    <Router navigationBarStyle={{ backgroundColor: '#577a9e' }}>
      <Stack key="root" headerLayoutPreset="center">
        <Scene
          key="TodoList"
          component={TodoList}
          leftTitle=""
          onLeft={() => {}}
          title="待辦事項"
          titleStyle={{ color: '#FBFBFF' }}
          leftButtonTextStyle={{ color: '#FBFBFF' }}
          rightButtonTextStyle={{ color: '#FBFBFF' }}
          initial
        />
        <Scene
          key="TodoForm"
          component={TodoForm}
          title="新增待辦"
          titleStyle={{ color: '#FBFBFF' }}
          navBarButtonColor="#FBFBFF"
          back
        />
      </Stack>
    </Router>
  );
};

export default Routes;
