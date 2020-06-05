import React, { Component } from "react";
import { Modal, Row, Col, Input, Button, message } from "antd";
import { deleteUserAccount } from "../api/todo";
import history from "../history";

export default class DeleteAccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      actualEmail: localStorage.getItem("email"),
      enteredEmail: undefined,
    };
  }

  handleOk = async () => {
      if(this.state.enteredEmail !== this.state.actualEmail)
        message.error("Emails doesn't match");

      else{
          try{
            await deleteUserAccount(this.state.actualEmail);
            message.success("User deleted successfully");
            history.push("/")
          }
          catch(err)
          {
              message.error("Something went wrong. Please try again later")
          }
         
          
      }

  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.toggleDeleteAccountModalVisibility();
  };

  handleEmailChange = (event) => {
    this.setState({ enteredEmail: event.target.value });
  };

  render() {
    return (
      <Modal
        visible={true}
        title="Delete Account"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Go back
          </Button>,
          <Button key="submit" type="danger" onClick={this.handleOk}>
            Delete My Account
          </Button>,
        ]}
      >
        <Row>
          <Col span={24}>
            <p>
              {" "}
              If you wish to delete your account please enter your email{" "}
              <b>{this.state.actualEmail + " "}</b>
              to permanantly <b>delete your account</b>
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={20} xs={16}>
            <Input
              id="name"
              placeholder="Enter your email"
              onChange={this.handleEmailChange}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}
