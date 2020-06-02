import React, { Component } from 'react'
import {Row, Col} from 'antd';
import HomePageRight from '../components/HomePageRight';
import HomePageLeft from '../components/HomePageLeft';
export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <Row>
                    <Col lg={14} sm={24}>
                        <HomePageLeft/>
                    </Col>
                    <Col lg={10} sm={24}>
                        <HomePageRight/>
                    </Col>
                </Row>
            </div>
        )
    }
}
