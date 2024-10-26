import React, { Component } from 'react';
import SockJS from 'sockjs-client';
import axios from 'axios';

import { Card, Button, Table, Input } from 'antd';
// import "antd/dist/antd";

import {getAllNotes, sendNote, deleteNote, updateNote} from './api/api'



class App extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
    serverTime: 'нет данных'
  }

  componentDidMount() {// выполнено монтирование компонента
    // создаем подключение к сокету
    this.sock = new SockJS('http://127.0.0.1:9999/echo');

    this.sock.onopen = function () {
      console.log('open');
      // при открытии пошлем на сервер сообщение
      this.send('socket opened');
    };
    // на событие onmessage навешиваем одноименную функцию
    this.sock.onmessage = this.onMessage.bind(this);
    this.sock.onclose = function () {
      console.log('close');
    };
    setInterval(this.tick, 1000);

    // this.handleSendNote(); // следующие строки добавляем
    this.getAll();
  }

  handleSendNote = () => {
      sendNote()
        .then(res => {
        console.log(res)})
        .catch(err => console.log(err));
    }

  getAll = () => {
    getAllNotes()
      .then(res => {
        //console.log(res)
        this.setState({data: res.data})
      })
      .catch(err => console.log(err));
  }

  //функция получает данные...
  onMessage = (e) => {
    if (e.data) {
      // и помещает их в state
      this.setState({
        serverTime: e.data
      })
    }
  }
  

  tick = () => {
    this.setState({
      time: new Date().toLocaleTimeString(),
    })
  }
  
  setInput = (typeIn, value) => {
    typeIn === "title" ? this.setState({title: value}) : this.setState({body: value})
  }

  addNote = async () => {
    await axios.post('http://localhost:8000/notes/add', {
      'title': this.state.title,
      'body': this.state.body
  });

  this.getAll();
  }

  deleteNote =  () => {
     deleteNote(this.state.title)
      .then(this.getAll);
  }

  updateNote = () => {
    updateNote(this.state.title, this.state.body)
     .then(this.getAll)
  }

  render() {
    const columns = [
      {
        title: '_id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'body',
        dataIndex: 'body',
        key: 'body',
      },
      {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
      }
    ];
    return (
      <Card 
            title={'Hello, world!'}
            actions={[
                <h1>Время: {this.state.time}</h1>, 
                <h1>Серверноевремя: {this.state.serverTime}</h1>
            ]}>
        <Table columns={columns} dataSource={this.state.data} />
        <Button onClick={this.addNote}>Добавить запись</Button>
        <Input placeholder='Title' style={{'width': '10%', marginLeft:"15px"}} onChange={(e) => this.setInput('title', e.target.value)} />
        <Input placeholder='Body' style={{'width': '10%', marginLeft:"15px"}} onChange={(e) => this.setInput('body', e.target.value)} />
        <Button onClick={this.deleteNote} style={{marginLeft:"15px"}}>Удалить запись</Button>
        <Button onClick={this.updateNote} style={{marginLeft:"15px"}}>Изменить запись</Button>
      </Card>

    )
  }
} 

export default App;
