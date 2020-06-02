import React, { Component } from "react";
import { createNewList } from "../api/todo";
import { Modal, Button, Input, Row, Col, message } from "antd";
export default class CreateListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      name: undefined,
      description: undefined,
    };
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.toggleCreateModalVisibility(false, false);
  };

  handleOk = async () => {
    if (this.state.name === undefined) message.error("Name can't be empty");
    else {
      let desc;
      if(this.state.description === undefined)
        desc=" "
      else
        desc = this.state.description
      await createNewList(
        localStorage.getItem("email"),
        this.state.name, 
        desc
      );
      this.setState({ visible: false });
      this.props.toggleCreateModalVisibility(false, true);
    }
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="Create New List"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Row>
          <Col lg={4} xs={8}>
            <label for="name"> Name: </label>
          </Col>
          <Col lg={20} xs={16}>
            <Input
              id="name"
              placeholder="Enter name"
              onChange={this.handleNameChange}
            />
          </Col>
        </Row>

        <Row className="form-top-margin-3vh">
          <Col lg={4} xs={8}>
            <label for="description"> Description: </label>
          </Col>
          <Col lg={20} xs={16}>
            <Input.TextArea
              id="description"
              placeholder="Enter description"
              onChange={this.handleDescriptionChange}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}
