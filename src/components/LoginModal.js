import React, { Component } from 'react'
import {Modal, Button, Input, Col, Row, message} from 'antd';
import { login } from '../api/todo';
import history from '../history';



export default class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            email: undefined,
            password: undefined,
        }
    }

    handleCancel = () =>
    {
        this.setState({visible: false})
        this.props.toggleLoginModalVisibility(false);
    }

    handleOk = async () => {
        if(this.state.email === undefined)
            message.error("Email can't be empty");
        else if(this.state.password === undefined)
            message.error("Password can't be empty");
        else{
            try{
                const response = await login(this.state.email, this.state.password);
                localStorage.clear();
                localStorage.setItem('email', this.state.email);
                localStorage.setItem("isSubscribed", response.data.subscribed)
                history.replace('/main');
            }
            catch(err)
            {
                if(err.response)
                    message.error(err.response.data);
                else
                    message.error("Something went wrong, Please try again")
            }

        }


        
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }


  
    

    render() {
        return (
            <Modal
                visible={this.state.visible}
                title="Log in"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                    Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                    Login
                    </Button>,
                ]}
            >
                
                <Row>
                    <Col lg={4} md={6} sm={6} xs={6}>
                        <label for="email"> Email: </label>
                    </Col>
                    <Col lg={20} md={18} sm={18} xs={18}>
                        <Input id="email" placeholder="Enter email" onChange={this.handleEmailChange}/>
                    </Col>
                </Row>

                <Row className="form-top-margin-3vh">
                    <Col lg={4} md={6} sm={6} xs={6}>
                        <label for="password"> Password: </label>
                    </Col>
                    <Col lg={20} md={18} sm={18} xs={18}>
                        <Input.Password id="password" placeholder="Enter Password" onChange={this.handlePasswordChange}/>
                    </Col>
                </Row>
        </Modal>
        )
    }
}
