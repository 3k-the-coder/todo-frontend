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
                        <Col lg={12}>
                        <h2 className="header-logo"> TODO TRACKER </h2>
                        <span className="header-tagline"> Your one stop solution, to getting things done.. </span>
                        </Col>
                        <Col lg={12}>
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
