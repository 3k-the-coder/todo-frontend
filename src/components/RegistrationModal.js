import React, { Component } from "react";
import { register } from "./../api/todo";
import {Modal, Button, Row, Col, Input, message} from 'antd';

export default class RegistrationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      name: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      registerClicked: false,
    };
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.toggleRegisterModalVisibility(false);
  };

  handleOk = async () => {
    if(this.state.name === undefined)
      message.error("Name can't be empty");
    else if(this.state.email === undefined)
      message.error("Please enter an email to continue");
    else if(this.state.password === undefined)
      message.error("Please enter a password to continue");
    else if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)))
      message.error("Please enter email in a proper format")
    else if(this.state.password.length < 8)
      message.error("Password should at least be 8 characters long");
    else if(this.state.password !== this.state.confirmPassword)
      message.error("Passwords doesn't match");

    else
    {
      try{
        this.setState({ registerClicked: true })
        await register(
          this.state.name,
          this.state.email,
          this.state.password,
          this.state.confirmPassword
        );
        message.success("User registered successfully. Please login to continue")
        this.setState({ visible: false });
        this.props.toggleRegisterModalVisibility(false);
      }
      catch(err)
      {
        this.setState({ registerClicked: false })
        if(err.response)
          message.error(err.response.data)
        else
          message.error("Something went wrong!")
      }
      
  
      
    }

  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="Register"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          this.state.registerClicked
          ? <Button key="submit" type="primary" loading={true}> Registering </Button>
          :
          <Button key="submit" type="primary" onClick={this.handleOk}>
            Register
          </Button>,
        ]}
      >

            <Row>
                <Col lg={4} md={6} sm={6} xs={6}>
                    <label for="name"> Name: </label>
                </Col>
                <Col lg={20} md={18} sm={18} xs={18}>
                    <Input
                    id="name"
                    placeholder="Enter name"
                    onChange={this.handleNameChange}
                    />
                </Col>
            </Row>


        <Row className="form-top-margin-3vh">
          <Col lg={4} md={6} sm={6} xs={6}>
            <label for="email"> Email: </label>
          </Col>
          <Col lg={20} md={18} sm={18} xs={18}>
            <Input
              id="email"
              placeholder="Enter email"
              onChange={this.handleEmailChange}
            />
          </Col>
        </Row>

        <Row className="form-top-margin-3vh">
          <Col lg={4} md={6} sm={6} xs={6}>
            <label for="password"> Password: </label>
          </Col>
          <Col lg={20} md={18} sm={18} xs={18}>
            <Input.Password
              id="password"
              placeholder="Enter Password"
              onChange={this.handlePasswordChange}
            />
          </Col>
        </Row>
        <Row className="form-top-margin-3vh">
            <Col lg={4} md={6} sm={6} xs={6}> 
                <label for="confirm-password">Confirm: </label>
            </Col>
            <Col lg={20} md={18} sm={18} xs={18}>
                <Input.Password
                id="confirm-password"
                placeholder="Confirm Password"
                onChange={this.handleConfirmPasswordChange}
                />
            </Col>
        </Row>
      </Modal>
    );
  }
}
