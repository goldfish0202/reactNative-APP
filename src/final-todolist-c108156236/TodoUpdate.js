import React from 'react';
import { StyleSheet, View, Switch, TextInput, Button, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Picker } from '@react-native-picker/picker';

export default class TodoUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.data.id,
      // 初始待辦類型
      type: props.data.type,
      // 初始待辦標題
      title: props.data.title,
      // 待辦備註
      subTitle: props.data.subTitle,
      // 待辦是否完成
      completed: props.data.complete,
    };
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
    const { handleUpdateTodo } = this.props;
    // 返回前一個頁面
    Actions.pop();
    // 呼叫子元件所傳入的事件並將表單的輸入內容帶入參數回傳回去
    handleUpdateTodo(this.state);
    // 新增待辦事項後將表單設定回到初始預設值
    // this.setState({
    //   type: 'life',
    //   title: null,
    //   subTitle: null,
    //   completed: false,
    // });
  };

  render() {
    const { type, title, subTitle, completed } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.item}>
            <Text style={styles.label}>變更待辦類型</Text>
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
        <Button title="修改待辦" disabled={!title || !subTitle} onPress={this.handleAddPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
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
  },
  picker: {
    width: 150,
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    marginLeft: 15,
  },
  switch: {
    marginLeft: 10,
  },
});
