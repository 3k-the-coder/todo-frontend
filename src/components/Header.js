import React, { Component } from 'react'
import {Row, Col, Button} from 'antd';
import history from '../history';



export default class Header extends Component {

    handleLogoutClick = () => {
        localStorage.clear();
        history.push('/')
    }


    render() {
        return (
            <header className="header">
                    <Row>
                        <Col lg={12} md={16} sm={16} xs={16}>
                        <h4 className="header-logo"> TODO TRACKER </h4>
                        <span className="header-tagline"> Your one stop solution, to getting things done.. </span>
                        </Col>
                        <Col lg={12} md={8} sm={8} xs={8}>
                            <Button type="secondary" 
                                onClick={this.handleLogoutClick} 
                                className="logout-btn float-right background-color-primary"
                            > 
                                Logout 
                            </Button>
                        </Col>
                    </Row>
            </header>
        )
    }
}
