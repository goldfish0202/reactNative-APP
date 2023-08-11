import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          type: 'life',
          title: 'Visit doctor',
          subTitle: 'Remember to bring your documents',
          time: '14:43',
          completed: false,
        },
        {
          id: 2,
          type: 'life',
          title: 'Visit pathology lab',
          subTitle: 'Prepare relevant notes',
          time: '16:00',
          completed: true,
        },
        {
          id: 3,
          type: 'work',
          title: 'Attend gym',
          subTitle: 'Wearing sportswear',
          time: '17:20',
          completed: false,
        },
        {
          id: 4,
          type: 'life',
          title: 'Cook food',
          subTitle: 'Go to the supermarket to prepare ingredients',
          time: '19:00',
          completed: false,
        },
        {
          id: 5,
          type: 'entertainment',
          title: 'watching TV',
          subTitle: 'Relax time',
          time: '20:00',
          completed: true,
        },
        {
          id: 6,
          type: 'work',
          title: 'delectus aut autem',
          subTitle: 'quis ut nam facilis et officia qui',
          time: '20:00',
          completed: true,
        },
        {
          id: 7,
          type: 'entertainment',
          title: 'fugiat veniam minus',
          subTitle: 'et porro tempora',
          time: '02:30',
          completed: true,
        },
        {
          id: 8,
          type: 'work',
          title: 'nesciunt totam sit blanditiis sit',
          subTitle: 'laborum aut in quam',
          time: '15:33',
          completed: false,
        },
      ],
      todosStatus: 'all',
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      leftTitle: 'C108156236\n蔡欣妤',
      onLeft: () => {},
      rightTitle: '新增',
      onRight: () => {
        Actions.TodoForm({ data: '', handleAddTodo: this.handleAddTodo });
      },
    });
  }

  handlePress = id => {
    const newTodos = this.state.todos.map(todo => {
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    });

    this.setState({
      todos: newTodos,
    });
  };

  handleAddTodo = todo => {
    if (todo.id !== '') {
      const newTodos = this.state.todos.map(t => {
        return t.id === todo.id
          ? {
              ...t,
              id: todo.id,
              type: todo.type,
              title: todo.title,
              subTitle: todo.subTitle,
              completed: todo.completed,
            }
          : t;
      });
      this.setState({
        todos: newTodos,
      });
    } else {
      this.setState({
        todos: [
          ...this.state.todos,
          {
            ...todo,
            id: this.state.todos.pop().id + 1,
            time: new Date().getHours() + ':' + new Date().getMinutes(),
          },
        ],
      });
    }
  };

  handledeleteTodo = deleteId => {
    // alert('確定要刪除?');
    Alert.alert(
      '刪除',
      '刪除後無法復原，確認要刪除？',
      [
        {
          text: '取消',
        },
        {
          text: '確定',
          onPress: () => {
            const deleteTodos = this.state.todos.filter(todo => todo.id !== deleteId);
            this.setState({
              todos: deleteTodos,
            });
          },
        },
      ],
      {
        // 訊息訊窗是否可點擊視窗外地方自動取消
        cancelable: true,
      },
    );
  };

  handleChangeTodosStatus = status => {
    this.setState({
      todosStatus: status,
    });
  };

  handleGetTodos = () => {
    const { todos, todosStatus } = this.state;
    switch (todosStatus) {
      case 'life':
        return todos.filter(todo => {
          return todo.type === 'life';
        });
      case 'work':
        return todos.filter(todo => {
          return todo.type === 'work';
        });
      case 'entertainment':
        return todos.filter(todo => {
          return todo.type === 'entertainment';
        });
      default:
        return todos;
    }
  };

  render() {
    const { handleChangeTodosStatus, handleGetTodos } = this;
    // 透過 filter 函式將原陣列（todos）中的元素逐個過濾判斷「是否完成狀態」後回傳一個新陣列
    const unCompletedTodos = handleGetTodos().filter(todo => todo.completed === false);
    const completedTodos = handleGetTodos().filter(todo => todo.completed === true);

    return (
      <View style={styles.container}>
        <View style={styles.classbtnView}>
          <TouchableOpacity style={styles.classbtn} onPress={() => handleChangeTodosStatus('all')}>
            <Text style={styles.classtext}>全部</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.classbtn} onPress={() => handleChangeTodosStatus('life')}>
            <Text style={styles.classtext}>生活</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.classbtn} onPress={() => handleChangeTodosStatus('work')}>
            <Text style={styles.classtext}>工作</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.classbtn}
            onPress={() => handleChangeTodosStatus('entertainment')}>
            <Text style={styles.classtext}>娛樂</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>
            <Text style={styles.todoTitle}>未完成項目</Text>
            <View style={styles.todoItems}>
              {unCompletedTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onPress={this.handlePress}
                  updateTodo={() => {
                    Actions.TodoForm({ data: todo, handleAddTodo: this.handleAddTodo });
                  }}
                  deleteTodo={this.handledeleteTodo}
                />
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.todoTitle}>已完成項目</Text>
            <View style={styles.todoItems}>
              {completedTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onPress={this.handlePress}
                  deleteTodo={this.handledeleteTodo}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 分割畫面區塊
    backgroundColor: '#FBFBFF', // 版面背景顏色
  },
  classbtnView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  classbtn: {
    backgroundColor: '#95CACA',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  classtext: {
    fontSize: 16,
    color: 'white',
  },
  todoTitle: {
    color: '#1b5288',
    fontSize: 20, // 標題文字大小
    fontWeight: 'bold', // 標題文字粗細
    padding: 10, // 上下垂直內聚大小
  },
  todoItems: {
    marginHorizontal: 10, // TodoItems 整個區塊的左右外距大小
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
