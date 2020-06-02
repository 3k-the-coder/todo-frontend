import React, { Component } from "react";
import { Card, Row, Col, Tooltip, Tag, Checkbox, Popconfirm } from "antd";
import EditTaskModal from "./EditTaskModal";
import { getSingleTask, updateTask } from "../api/todo";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      isEditTaskModalVisible: false,
      completed: this.props.task.isCompleted,
    };
  }

  handleEditTask = () => {
    this.setState({ isEditTaskModalVisible: true });
  };

  toggleEditTaskModalVisibility = async (value) => {
    // this.setState({ task: undefined })
    const response = await getSingleTask(this.state.task.id);
    this.setState({
      isEditTaskModalVisible: value,
      task: response.data,
    });
  };

  handleDeleteClick = () => {
    this.props.handleDeleteTask(this.state.task.id);
  };

  handleCompleteClick = async () => {
    const task = this.state.task;
    let checked = this.state.completed;
    await updateTask(
      task.id,
      task.name,
      task.description,
      task.label,
      task.status,
      task.date,
      task.time,
      !checked
    );
    const response = await getSingleTask(this.state.task.id);
    this.setState({
      completed: !checked,
      task: response.data,
    });
    await this.props.reload();
  };

  getCompletedTitle = () => {
    if (this.state.completed)
      return "This will mark the task as incomplete and active. Click on Yes to confirm";
    return "We will archive the task since it is completed. Click on Yes  to confirm completion";
  };

  isToday = (date) => {
    const today = new Date();
    if (today.getFullYear() === date.getFullYear())
      if (today.getMonth() === date.getMonth())
        if (today.getDate() === date.getDate()) return true;
    return false;
  };

  getDateTimeString = (dateTime) => {
    const date = new Date(dateTime);
    let dateString;
    if (this.isToday(date)) dateString = "Today";
    else
      dateString =
        "" +
        date.getFullYear() +
        " " +
        months[date.getMonth() - 1] +
        " " +
        date.getDate();

    const hour = date.getHours();
    let timeString;
    if (hour > 12)
      timeString =
        " " +
        (hour - 12) +
        ":" +
        (date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()) +
        " PM";
    else
      timeString =
        " " +
        hour +
        ":" +
        (date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()) +
        " AM";

    return dateString + timeString;
  };

  render() {
    const task = this.state.task;
    
    return (
      <Card className="task small-top-margin">
        <Row>
          <Col lg={18} md={14} sm={14} xs={14}>
            <h3>
              {task.name}
              <Tag className="small-left-margin status-tag" color="success">
                {task.status}
              </Tag>
            </h3>
          </Col>
          <Col lg={6} md={10} sm={10} xs={10}>
            <Row>
              <Col lg={8} md={8} sm={8} xs={8}>
                {!this.state.completed && (
                  <Tooltip title="Delete task">
                    <Popconfirm
                      title="Are you sure?"
                      onConfirm={this.handleDeleteClick}
                      okText="Yes, Delete it."
                      cancelText="No"
                    >
                      <DeleteOutlined className="float-right delete-task task-icon" />
                    </Popconfirm>
                  </Tooltip>
                )}
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>
                <Tooltip title="Edit task">
                  <EditOutlined
                    className="float-right task-icon"
                    onClick={this.handleEditTask}
                  />
                </Tooltip>
              </Col>
              <Col lg={8} md={8} sm={8} xs={8}>
                <Tooltip title="Mark as Completed">
                  <Popconfirm
                    title={this.getCompletedTitle}
                    okText="Yes, I confirm"
                    cancelText="No"
                    onConfirm={this.handleCompleteClick}
                  >
                    <Checkbox
                      className="float-right completed-checkbox"
                      checked={this.state.completed}
                    />
                  </Popconfirm>
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="small-top-margin">
          <Col lg={24}>
            Due on: {this.getDateTimeString(task.due_date)}
            {new Date(task.due_date) < new Date() && (
              <Tag className="due-late-tag"  color="#f50"> Late </Tag>
            )}
          </Col>
        </Row>
        <Row className="small-top-margin">
          <Col lg={24}>
            <Tag color="default"> {task.label} </Tag>
          </Col>
        </Row>

        {this.state.isEditTaskModalVisible && (
          <EditTaskModal
            task={this.state.task}
            visible={this.state.isEditTaskModalVisible}
            toggleEditTaskModalVisibility={this.toggleEditTaskModalVisibility}
          />
        )}
      </Card>
    );
  }
}
