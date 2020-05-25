import React, { Component } from 'react'
import {  Col, Row, Tooltip } from 'antd';
import { EditOutlined} from '@ant-design/icons';

export default class UserLists extends Component {
    constructor(props){
        super(props);
        this.state = {
            lists: this.props.lists
        }
    }


    renderLists = () => {
        return  (
                this.state.lists.map((item, index)=> {
                    return <Col lg={5}>
                        <div className="list-detail small-left-margin">
                            
                            <Row>
                                <Col lg={22}>
                                    {item.name} 
                                </Col>
                                <Col lg={2}>
                                    <Tooltip title="Edit">
                                        <EditOutlined onClick={() => this.props.handleListSelection(item)}/>
                                    </Tooltip>
                                </Col>
                            </Row>
                            
                        </div>
                    </Col>
                })
            )
    }
    render() {
        return (
            <div className="user-list-content">
                <h2> YOUR LISTS </h2> <br/>
                <Row>
                {this.renderLists()}
                <Col lg={5}>
                    <div className="list-detail create-new-list-div small-left-margin" onClick={this.props.handleCreateNewList}> 
                        Create new list
                    </div>
                </Col>
                </Row>
            </div>
        )
    }
}
