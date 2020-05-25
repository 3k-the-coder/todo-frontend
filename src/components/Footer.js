import React, { Component } from 'react'
import {Row, Col} from 'antd';
export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Row> 
                    <Col lg={12}>
                        
                    </Col>
                    <Col lg={12}>
                        <p className="footer-text float-right"> copyright &copy; {new Date().getFullYear()} </p>
                    </Col>
                </Row>
            </footer>
        )
    }
}
