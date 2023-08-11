import React from 'react';
import { Text } from 'react-native';
import { Router, Drawer, Stack, Scene, Actions } from 'react-native-router-flux';
import HomeDrawer from './HomeDrawer';
import HomeList from './HomeList';
import HomeDetail from './HomeDetail';
import out from './out/out';
import outOrder from './out/outOrder';
import outOrderCheck from './out/outOrderCheck';
import outOrderSelect from './out/outOrderSelect';
import inOrder from './in/inOrder';
import inOrderCheck from './in/inOrderCheck';
import Booking from './book/Booking';
import BookForm from './book/BookFrom';
import BookUpdate from './book/BookUpdate';
import BookSelect from './book/BookSelect';
import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';

const TabIcon = props => (
  // 自定義 Tab 的項目時，props 內已擁有 focused 與 title 資料可用來判斷點擊的 Tab 並標示顏色
  <Text style={{ color: props.focused ? '#FFB01C' : 'black' }}>{props.title}</Text>
);

class Home extends React.Component {
  render() {
    const homeicon = (
      <Icon name={'home'} size={35} color={'#FFCF78'} style={{ textAlignVertical: 'center' }} />
    );
    const drawericon = (
      <FIcon name={'menu'} size={35} color={'#FFCF78'} style={{ textAlignVertical: 'center' }} />
    );
    return (
      <Router>
        <Drawer contentComponent={HomeDrawer} drawerIcon={drawericon}>
          <Stack key="root" title="首頁" icon={TabIcon} headerTitleAlign="center">
            <Scene key="homepage" title="高科小館" component={HomeList} initial />
            <Scene key="HomeDetail" component={HomeDetail} back />
            <Scene
              key="out"
              component={out}
              title="外帶自取"
              rightTitle={homeicon}
              onRight={() => {
                Actions.popTo('homepage');
              }}
            />
            <Scene key="outOrder" component={outOrder} title="點餐" back />
            <Scene key="outOrderCheck" component={outOrderCheck} title="外帶訂單確認" back />
            <Scene
              key="outOrderSelect"
              component={outOrderSelect}
              title="外帶訂單查詢"
              rightTitle={homeicon}
              onRight={() => {
                Actions.popTo('homepage');
              }}
              back
            />
            <Scene
              key="inOrder"
              component={inOrder}
              title="內用點餐"
              rightTitle={homeicon}
              onRight={() => {
                Actions.popTo('homepage');
              }}
            />
            <Scene key="inOrderCheck" component={inOrderCheck} title="內用訂單確認" back />
            <Scene
              key="Booking"
              component={Booking}
              title="訂位"
              rightTitle={homeicon}
              onRight={() => {
                Actions.popTo('homepage');
              }}
            />
            <Scene
              key="BookForm"
              component={BookForm}
              title="線上訂位"
              rightTitle={homeicon}
              onRight={() => {
                Actions.popTo('homepage');
              }}
              back
            />
            <Scene
              key="BookSelect"
              component={BookSelect}
              title="查詢訂位"
              rightTitle={homeicon}
              onRight={() => {
                Actions.popTo('homepage');
              }}
              leftTitle={' '}
              onLeft={() => {}}
            />
            <Scene key="BookUpdate" component={BookUpdate} title="修改訂位" back />
          </Stack>
        </Drawer>
      </Router>
    );
  }
}

export default Home;
