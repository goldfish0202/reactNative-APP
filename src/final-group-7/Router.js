import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import out from './out';
import outOrder from './outOrder';
import outOrderCheck from './outOrderCheck';
import outOrderSelect from './outOrderSelect';

const Routes = () => {
  return (
    <Router>
      <Stack key="root" headerLayoutPreset="center">
        <Scene key="out" component={out} title="外帶點餐" initial />
        <Scene key="outOrder" component={outOrder} title="點餐" back />
        <Scene key="outOrderCheck" component={outOrderCheck} title="外帶訂單確認" back />
        <Scene key="outOrderSelect" component={outOrderSelect} title="外帶訂單查詢" back />
      </Stack>
    </Router>
  );
};

export default Routes;
