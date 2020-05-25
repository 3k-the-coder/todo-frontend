import React, { Component } from "react";
import { createNewTask } from "../api/todo";
import { Modal, Button, Input, Row, Col, Select, TimePicker, DatePicker, message } from "antd";

const { Option } = Select;

export default class CreateTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      name: undefined,
      description: undefined,
      label: undefined,
      status: undefined,
      date: undefined,
      time: undefined
    };
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.toggleCreateTaskModalVisibility(false, false);
  };

  handleOk = async () => {
    let desc;
      if(this.state.description === undefined)
        desc=" "
      else
        desc = this.state.description
    if (this.state.name === undefined) message.error("Name can't be empty");
    else if(this.state.label === undefined) message.error("Please select a label for the task");
    else if(this.state.status === undefined) message.error("Please select a status for the task");
    else if(this.state.date === undefined || this.state.time === undefined) 
      message.error("Please select a due date and time for the task");
    
    else{
      await createNewTask(
        this.props.selectedList.id,
        this.state.name,
        desc,
        this.state.label,
        this.state.status,
        this.state.date,
        this.state.time
      );
      this.setState({ visible: false });
      this.props.toggleCreateTaskModalVisibility(false, true);
    }


  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleLabelChange = (value) => {
    this.setState({ label: value });
  };

  handleStatusChange = (value) => {
    this.setState({ status: value });
  };

  handleDateChange = (date, dateString) => {
      this.setState({ date: dateString })
  }

  handleTimeChange = (time, timeString) => {
    this.setState({ time: timeString })
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="Create New Task"
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
          <Col lg={4}>
            <label for="name"> Name: </label>
          </Col>
          <Col lg={20}>
            <Input
              id="name"
              placeholder="Enter name"
              onChange={this.handleNameChange}
            />
          </Col>
        </Row>

        <Row className="form-top-margin-3vh">
          <Col lg={4}>
            <label for="description"> Description: </label>
          </Col>
          <Col lg={20}>
            <Input.TextArea
              id="description"
              placeholder="Enter description"
              onChange={this.handleDescriptionChange}
            />
          </Col>
        </Row>
        <Row className="form-top-margin-3vh">
          <Col lg={4}>
            <label for="label"> Label: </label>
          </Col>
          <Col lg={20}>
            <Select
              showSearch
              placeholder="Select a label"
              optionFilterProp="children"
              onChange={this.handleLabelChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Personal">Personal</Option>
              <Option value="Work">Work</Option>
              <Option value="Shopping">Shopping</Option>
              <Option value="Others">Others</Option>
            </Select>
          </Col>
        </Row>
        <Row className="form-top-margin-3vh">
          <Col lg={4}>
            <label for="status"> Status: </label>
          </Col>
          <Col lg={20}>
            <Select
              showSearch
              placeholder="Select Status"
              optionFilterProp="children"
              onChange={this.handleStatusChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="New">New</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Others">Others</Option>
            </Select>
          </Col>
        </Row>

        <Row className="form-top-margin-3vh">
            <Col lg={4}>
                <label for="date"> Due Date: </label>
            </Col>
            <Col lg={8}>
                <DatePicker onChange={this.handleDateChange}/>
            </Col>
            <Col lg={8}>
                <TimePicker onChange={this.handleTimeChange} />
            </Col>
        </Row>
      </Modal>
    );
  }
}
