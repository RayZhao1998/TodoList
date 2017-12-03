import React from 'react';
import ReactDOM from 'react-dom';
import * as bs from 'react-bootstrap'
import {Row, Col, Form, Input, Button,notification } from 'antd';
import './index.css';
export default class AddTodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.saveNewItem = this.saveNewItem.bind(this)
  }
  saveNewItem(e) {
    e.preventDefault()
    let element = ReactDOM.findDOMNode(this.refs.newItem)
    let task = element.value
    if (!task) {
      notification.open({
        description: 'Todo内容不得为空！',
    });
    } else {
      this.props.saveNewItem(task)
      element.value = ""
    }
  }
  render() {
    return (
      <div>
        <bs.ListGroup>
            <bs.ListGroupItem>Item 1</bs.ListGroupItem>
            <bs.ListGroupItem>Item 2</bs.ListGroupItem>
            <bs.ListGroupItem>...</bs.ListGroupItem>
      </bs.ListGroup>
      </div>
    )
  }
}