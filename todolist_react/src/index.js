import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as bs from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import TodoItem from './TodoItem.js'
import TodoList from './TodoList.js'
import TodoFinishedList from './TodoFinishedList.js'
import { Panel, ListGroup, ListGroupItem, Checkbox, Col, Button, Row } from 'react-bootstrap';

function handleSelect(selectedKey) {
    alert(`selected ${selectedKey}`);
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 1,
        }
    }

    render() {
        return (
            <div class="background">
                <bs.Navbar>
                    <bs.Navbar.Header>
                        <bs.Navbar.Brand>
                            <a>TodoList</a>
                        </bs.Navbar.Brand>
                    </bs.Navbar.Header>
                    <bs.Navbar.Collapse style={{marginLeft: 300,}}>
                        <bs.Navbar.Form pullLeft>
                            <bs.FormGroup>
                                <bs.FormControl type="text" placeholder="Search"  style={{width: 400}}/>
                            </bs.FormGroup>
                            {' '}
                            <bs.Button type="submit">Search</bs.Button>
                        </bs.Navbar.Form>
                    </bs.Navbar.Collapse>
                </bs.Navbar>
                <div class="box">
                    <div class="navLeft">
                        <bs.Nav bsStyle="pills" stacked activeKey={1}>
                            <bs.NavItem eventKey={1}  onSelect={() => this.setState({selected: 1})}>待完成</bs.NavItem>
                            <bs.NavItem eventKey={2}  onSelect={() => this.setState({selected: 2})}>已完成</bs.NavItem>
                        </bs.Nav>
                    </div>
                    <div class="bodyRight">
                        {this.state.selected==1?<TodoList/>:<TodoFinishedList/>}
                    </div>
                </div>
            </div>
        );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  
  
  
  