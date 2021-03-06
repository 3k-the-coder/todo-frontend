import React, { Component } from "react";
import { updateTask } from "../api/todo";
import { Modal, Button, Input, Row, Col, Select, TimePicker, DatePicker, message } from "antd";
import moment from 'moment'
const { Option } = Select;

export default class EditTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      name: this.props.task.name,
      description: this.props.task.description,
      label: this.props.task.label,
      status: this.props.task.status,
      date: undefined,
      time: undefined,
      isCompleted: this.props.task.isCompleted,
      editClicked: false
    };
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.toggleEditTaskModalVisibility(false, false);
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
      try{
        this.setState({ editClicked: true })
        await updateTask(
          this.props.task.id,
          this.state.name,
          desc,
          this.state.label,
          this.state.status,
          this.state.date,
          this.state.time,
          this.state.isCompleted
        );
        message.success("Task updated successfully")
        this.setState({ visible: false });
        this.props.toggleEditTaskModalVisibility(false, true);
      }
      catch(err)
      {
        this.setState({ editClicked: false })
        if (err.response.data) message.error(err.response.data);
        else message.error("Something went wrong");
      }
        
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

  componentDidMount = () => {
      const split_date = (this.props.task.due_date.split("T"))
      const date = split_date[0]
      const time = split_date[1].split("Z")[0]

      this.setState({ 
          date,
          time
       })
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="Edit Task"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          this.state.editClicked
          ?<Button key="submit" type="primary" loading={true}>
          Editing
        </Button>
          :
          <Button key="submit" type="primary" onClick={this.handleOk}>
            Edit
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
              value={this.state.name}
            />
          </Col>
        </Row>

        <Row className="form-top-margin-3vh">
          <Col lg={4} md={6} sm={6} xs={6}>
            <label for="description"> Description: </label>
          </Col>
          <Col lg={20} md={18} sm={18} xs={18}>
            <Input.TextArea
              id="description"
              placeholder="Enter description"
              onChange={this.handleDescriptionChange}
              value={this.state.description}
            />
          </Col>
        </Row>
        <Row className="form-top-margin-3vh">
          <Col lg={4} md={6} sm={6} xs={6}>
            <label for="label"> Label: </label>
          </Col>
          <Col lg={20} md={18} sm={18} xs={18}>
            <Select
              showSearch
              defaultValue={this.state.label}
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
          <Col lg={4} md={6} sm={6} xs={6}>
            <label for="status"> Status: </label>
          </Col>
          <Col lg={20} md={18} sm={18} xs={18}>
            <Select
              showSearch
              defaultValue={this.state.status}
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
            <Col lg={4} md={6} sm={6} xs={6}>
                <label for="date"> Due Date: </label>
            </Col>
            <Col lg={8} md={7} sm={7} xs={8}>
                <DatePicker onChange={this.handleDateChange}
                    value={moment(this.state.date, 'YYYY-MM-DD')}
                    />
            </Col>
            <Col lg={8} md={7} sm={7} xs={8}>
                <TimePicker onChange={this.handleTimeChange} 
                    value={moment(this.state.time, 'HH:mm')}
                    format="HH:mm"
                />
            </Col>
        </Row>
      </Modal>
    );
  }
}
