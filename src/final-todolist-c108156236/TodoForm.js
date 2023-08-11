import React from 'react';
import { StyleSheet, View, Switch, TextInput, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Picker } from '@react-native-picker/picker';

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 初始待辦id
      id: props.data !== '' ? props.data.id : '',
      // 初始待辦類型
      type: props.data !== '' ? props.data.type : 'life',
      // 初始待辦標題
      title: props.data !== '' ? props.data.title : null,
      // 待辦備註
      subTitle: props.data !== '' ? props.data.subTitle : null,
      // 待辦是否完成
      completed: props.data !== '' ? props.data.completed : false,
    };
  }
  componentDidMount() {
    this.props.navigation.setParams({
      title: this.props.data !== '' ? '修改代辦' : '新增待辦',
    });
  }

  // 變更待辦類型的選取值
  handleChangeType = value => {
    this.setState({
      type: value,
    });
  };

  // 變更待辦標題的文字
  handleChangeTitle = text => {
    this.setState({
      title: text,
    });
  };

  // 變更待辦備註的文字
  handleChangeSubTitle = text => {
    this.setState({
      subTitle: text,
    });
  };

  // 變更是否完成的開關值
  handleChangeCompleted = value => {
    this.setState({
      completed: value,
    });
  };

  // 新增待辦按鈕點擊時觸發的 Callback 事件
  handleAddPress = () => {
    const { handleAddTodo } = this.props;
    // 返回前一個頁面
    Actions.pop();
    // 呼叫子元件所傳入的事件並將表單的輸入內容帶入參數回傳回去
    handleAddTodo(this.state);
    // 新增待辦事項後將表單設定回到初始預設值
    this.setState({
      id: '',
      type: 'life',
      title: null,
      subTitle: null,
      completed: false,
    });
  };

  render() {
    const { type, title, subTitle, completed } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.bgc}>
          <View style={styles.item}>
            <Text style={styles.label}>待辦類型</Text>
            <Picker
              selectedValue={type}
              onValueChange={this.handleChangeType}
              style={styles.picker}>
              <Picker.Item label="生活" value="life" />
              <Picker.Item label="工作" value="work" />
              <Picker.Item label="娛樂" value="entertainment" />
            </Picker>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>待辦標題</Text>
            <TextInput
              value={title}
              onChangeText={this.handleChangeTitle}
              style={styles.textInput}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>備註事項</Text>
            <TextInput
              value={subTitle}
              onChangeText={this.handleChangeSubTitle}
              style={styles.textInput}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>是否完成</Text>
            <Switch
              value={completed}
              onValueChange={this.handleChangeCompleted}
              style={styles.switch}
            />
          </View>
        </View>
        {/* <Button
          title={this.props.data !== '' ? '更新代辦' : '新增待辦'}
          disabled={!title || !subTitle}
          onPress={this.handleAddPress}
          color="#577a9e"
        /> */}
        <TouchableOpacity disabled={!title || !subTitle} onPress={this.handleAddPress}>
          <Text style={!title || !subTitle ? styles.disablebtn : styles.enablebtn}>
            {this.props.data !== '' ? '更新代辦' : '新增待辦'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FBFBFF', // 版面背景顏色
    borderWidth: 1,
    borderColor: '#EEE',
  },
  bgc: {
    width: 350,
    height: 350,
    backgroundColor: '#d6eaea',
    elevation: 5,
  },
  item: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    color: 'gray',
  },
  picker: {
    width: 150,
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#577a9e',
    marginLeft: 15,
  },
  switch: {
    marginLeft: 10,
  },
  disablebtn: {
    padding: 10,
    color: '#888888',
    backgroundColor: '#DDDDDD',
  },
  enablebtn: {
    padding: 10,
    color: 'white',
    backgroundColor: '#577a9e',
  },
});
