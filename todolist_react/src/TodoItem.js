import React from 'react';
import * as bs from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import { Checkbox, Button, ListGroupItem, Col, ListGroup, Panel, Modal, FormControl } from 'react-bootstrap';
export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            showModal: false,
            taskTitle: this.props.title,
        };
    }

    handleInputChange(event) {
        this.setState({
            taskTitle: event.target.value,
        })
    }
    
    handleChange() {
        let isChecked = this.props.isChecked=='0'?'1':'0';
        this.props.changeTodoState(this.props.id, isChecked);
    }
    
    deleteTask() {
        this.props.deleteTodo(this.props.index, this.props.id)
    }

    updateTask() {
        this.props.updateTodo(this.props.id, this.state.taskTitle);
        this.setState({
            showModal: false,
        })
    }

    editTask() {
        this.setState({
            showModal: true
        });
    }

    render() {
        let task = this.props.task
        let itemChecked
        if (this.props.complete === "true") {
          task = <del>{task}</del>
          itemChecked = true
        } else {
          itemChecked = false
        }

        return (
            <div>
                <ListGroup>
                    <li inline class="listgroupitem">
                        <div class={this.props.priority=="1"?"priority1":this.props.priority=="2"?"priority2":"priority3"}></div>
                        <Col xs={3} md={1}>
                            <Checkbox checked={this.props.isChecked=='1'?true:false} onClick={this.handleChange.bind(this)}/>
                        </Col>
                        <Col xs={3} md={6} class="buttonRight">
                            {this.props.isChecked=='1'?<s class="text">{this.props.title}</s>:<p class="text">{this.props.title}</p>}
                        </Col>
                        <Col xs={3} md={3} class="buttonRight">
                            <p class="date">{this.props.endyear}-{this.props.endmonth}-{this.props.endday}</p>
                        </Col>
                        <Col xs={3} md={1} class="buttonRight">
                            <button class="deleteButton" onClick={this.deleteTask.bind(this)}>Delete</button>
                        </Col>
                        <Col xs={3} md={1} class="buttonRight">
                            <button class="editButton" onClick={this.editTask.bind(this)}>Edit</button>
                        </Col>
                    </li>
                </ListGroup>
                <div className="static-modal" onSubmit={this.handleChange}>
                    <Modal show={this.state.showModal} onSubmit={this.handleInputChange}>
                        <Modal.Header>
                            <Modal.Title>修改Todo</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                        <FormControl type="text" value={this.state.taskTitle} placeholder="Enter text" onChange={this.handleInputChange} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={()=>{this.setState({showModal: false})}}>Close</Button>
                            <Button bsStyle="primary" onClick={this.updateTask.bind(this)}>Save changes</Button>
                        </Modal.Footer>

                    </Modal>
                </div>
            </div>
        )
    }
}