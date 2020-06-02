import React, { Component } from 'react'
import {Row, Col} from 'antd';
export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Row>                     
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <p className="footer-text float-right"> copyright &copy; {new Date().getFullYear()} </p>
                    </Col>
                </Row>
            </footer>
        )
    }
}
