import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [
        {
          id: 1,
          name: '春節假期營業時間調整',
          subname: '春節期間營業時間將做調整，詳情請至官網觀看。',
          url: 'https://admin.hilai-foods.com/storage/images/1531/conversions/437_1637649968-large.jpg',
          desc: '除夕1/31(一)營業時間11:30～18:00 最後點餐時間17:00除夕1/31(一)~初五2/5(六) 各項優惠及飲料券恕不適用農曆春節【甜點吃到飽】供應時間初一至初四 2/1(二)~2/4(五)',
        },
        {
          id: 2,
          name: '把美味分享出去 打卡送好禮',
          subname: '即日來本店消費就贈送飲品二選一!',
          url: 'https://admin.hilai-foods.com/storage/images/1635/conversions/457_1641458557-large.jpg',
          desc: '《把美味分享出去》來店用餐並於 FB 或 IG 貼文打卡出示畫面給現場服務人員即送可樂或雪碧(250ml一罐)',
        },
        {
          id: 3,
          name: '生日送好禮',
          subname: '當日壽星至本店消費即贈送「茶碗蒸一份」',
          url: 'https://s.yimg.com/ny/api/res/1.2/p_.Ac13YH5YqZ0.5t6z7uw--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/dd5416cfa104813041efe5d3fb648658',
          desc: '憑相關證件證明，於生日當天來本店消費即可享有免費茶碗蒸!',
        },
      ],
      imageUrl: [
        'https://admin.hilai-foods.com/storage/images/1531/conversions/437_1637649968-large.jpg',
        'https://admin.hilai-foods.com/storage/images/1635/conversions/457_1641458557-large.jpg',
        'https://s.yimg.com/ny/api/res/1.2/p_.Ac13YH5YqZ0.5t6z7uw--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/dd5416cfa104813041efe5d3fb648658',
        'https://img.zcool.cn/community/01aa505832657ca801219c77e92974.jpg@1280w_1l_2o_100sh.jpg',
        'https://i.imgur.com/UE1N5dF.jpeg',
        'http://img95.699pic.com/photo/50125/1981.jpg_wh300.jpg!/fh/300/quality/90',
        'https://i.imgur.com/sllXuR9.jpeg',
        'https://tse2.mm.bing.net/th?id=OIP.o5KzsWjDOvwiC4Q0P3dtvwHaE5&pid=Api&P=0&w=238&h=158',
      ],
      icons: ['rice', 'noodles', 'food'],
    };
  }

  handleRedirectHomeDetail = id => {
    const { homes } = this.state;
    const home = homes.find(home => home.id === id);
    Actions.push('HomeDetail', { home: home, hideTabBar: true });
    // 跳轉至餐點詳細頁面時將底部的 Tab 隱藏
  };
  render() {
    const { homes, icons } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            horizontal={true}
            height={300}
            styles={styles.swiper}
            activeDotColor="#FF6347">
            {this.state.imageUrl.map(url => {
              const homecontent = homes.filter(home => home.url === url);
              return (
                <View key={url} style={styles.slide}>
                  <TouchableOpacity
                    disabled={homecontent.length === 0 ? true : false}
                    onPress={() =>
                      homecontent.length === 0
                        ? {}
                        : this.handleRedirectHomeDetail(homecontent[0].id)
                    }>
                    <Image source={{ uri: url }} resizeMode="cover" style={styles.sliderImage} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.categoryContainer}>
          {icons.map(icon => {
            return (
              <TouchableOpacity key={icon} disabled={true} style={styles.categoryBtn}>
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons name={icon} size={35} color="#FFB01C" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.cardsWrapper}>
          <Text style={styles.newst}>最新消息</Text>
          {homes.map(home => {
            return (
              <TouchableOpacity
                key={home.id}
                style={styles.card}
                onPress={() => this.handleRedirectHomeDetail(home.id)}>
                <View style={styles.cardImgWrapper}>
                  <Image
                    source={{
                      uri: home.url,
                    }}
                    resizeMode="cover"
                    style={styles.cardImg}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{home.name}</Text>
                  <Text style={styles.cardDetails}>{home.subname}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  newst: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  swiper: {
    flex: 1,
    flexDirection: 'row',
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#FFECC9' /* '#FF6347' */,
    borderRadius: 50,
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 12,
    elevation: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#FFF',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  container: {
    backgroundColor: '#F5F5F5',
  },
});
