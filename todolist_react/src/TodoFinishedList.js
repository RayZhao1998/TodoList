import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Panel, ListGroup, ListGroupItem, Checkbox, Col, Button, Row, FormGroup, InputGroup, FormControl, ButtonGroup } from 'react-bootstrap';
import TodoItem from './TodoItem.js';

export default class TodoList extends React.Component{
    
    componentDidMount = () => {
        fetch("http://127.0.0.1:8000/todolistfinished")
            .then(
                function (res) {
                    console.log(res)
                    if (res.ok) {
                        return res.json()
                    } else {
                        console.log('error')
                    }
                }
            )
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    taskList: responseData,
                });
          })
          .catch((error) => {
            console.warn(error);
          });
      }

    constructor(props) {
        super(props);
        this.state = {
            taskTitle: "",
            taskList: [],
            priority: "0",
            content: "",
            open: false,
            selectedDay: 2333,
            showedit: false,
        };
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.changeTodoState = this.changeTodoState.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            taskTitle: this.refs.input.value,
        })
    }

    handleAreaChange(event) {
        event.preventDefault();
        this.setState({
            content: this.refs.textarea.value,
        })
    }

    changeTodoState(id, isChecked){   //初始化isChangeAll为false
        var formData = new FormData();
        formData.append('id', id);
        fetch('http://127.0.0.1:8000/finishtodo', {
            method: 'POST',
            body: formData,
        })
        .then(
            function (res) {
                console.log(res)
                if (res.ok) {
                    return res.json()
                } else {
                    console.log('error')
                }
            }
        )
        .then((responseData) => {
            console.log(responseData);
            this.setState({
                taskList: responseData,
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    submit() {
        console.log(this.state.selectedDay.getDate());
        if (this.state.priority=="0") {
            alert("请选择任务紧急程度");
            return;
        }
        var task = this.state.taskTitle;
        var priority = this.state.priority;
        var date = this.state.selectedDay;
        var endyear = date.getYear()+1900;
        var endmonth = date.getMonth()+1;
        var endday = date.getDate();
        var content = this.state.content;
        var formData = new FormData();
        formData.append('task', task);
        formData.append('priority', priority);
        formData.append('endyear', endyear);
        formData.append('endmonth', endmonth);
        formData.append('endday', endday);
        formData.append('content', content);
        fetch('http://127.0.0.1:8000/addtodo/', {
            method: 'POST',
            body: formData,
        })
        .then(
            function (res) {
                console.log(res)
                if (res.ok) {
                    return res.json()
                } else {
                    console.log('error')
                }
            }
        )
        .then((responseData) => {
            console.log(responseData);
            this.setState({
                taskList: responseData,
                taskTitle: "",
            });
        })
        .catch((error) => {
            console.warn(error);
          });
    }

    deleteTodo(index, id){
        this.state.taskList.splice(index, 1);
        this.setState({taskList: this.state.taskList});
        var formData = new FormData();
        formData.append('id', id);
        fetch('http://127.0.0.1:8000/deletetodo', {
            method: 'POST',
            body: formData,
        })
        .then(
            function (res) {
                console.log(res)
                if (res.ok) {
                    return res.json()
                } else {
                    console.log('error')
                }
            }
        )
        .then((responseData) => {
            console.log(responseData);
            this.setState({
                taskList: responseData,
            });
        })
        .catch((error) => {
            console.warn(error);
          });
    }

    handleDayChange(day) {
        this.setState({ selectedDay: day });
    }

    getTodolistByPriority() {
        fetch("http://127.0.0.1:8000/todolistpriority")
        .then(
            function (res) {
                console.log(res)
                if (res.ok) {
                    return res.json()
                } else {
                    console.log('error')
                }
            }
        )
        .then((responseData) => {
            console.log(responseData);
            this.setState({
                taskList: responseData,
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    }

    render(){
    return(
        <div class="todoListMain">
            <div class="tasks">
                {
                    this.state.taskList.map((item) => {
                        return  <TodoItem title={item.task} isChecked={item.isCompleted=='1'?true:false} index={item.index} id={item.id} priority={item.priority} endyear={item.endyear} endmonth={item.endmonth} endday={item.endday} changeTodoState={this.changeTodoState.bind(this)} deleteTodo={this.deleteTodo.bind(this)}/>
                    })
                }      
            </div>
            {/* <div class="sortButton">
                <Button bsStyle="success" onClick={this.getTodolistByPriority.bind(this)} class="sortButton">按优先级排序</Button>
            </div> */}
        </div>
    )
  }
}