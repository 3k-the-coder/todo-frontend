import React, { Component } from "react";
import { Card, Row, Col, Tooltip, Tag, Checkbox, Popconfirm } from "antd";
import EditTaskModal from "./EditTaskModal";
import { getSingleTask, updateTask } from "../api/todo";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      isEditTaskModalVisible: false,
      completed: this.props.task.isCompleted
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
    await updateTask(task.id, task.name, task.description, task.label, task.status, task.date, task.time, !checked)
    const response = await getSingleTask(this.state.task.id);
    this.setState({
      completed: !checked,
      task: response.data,
    });
    await this.props.reload()
  }

  getCompletedTitle = () =>{
    if(this.state.completed)
      return "This will mark the task as incomplete and active. Click on Yes to confirm";
    return "We will archive the task since it is completed. Click on Yes  to confirm completion"
  }



  render() {
    const task = this.state.task;
    return (
      <Card className="task small-top-margin">
        <Row>
          <Col lg={18}>
            <h3>
              {task.name}
              <Tag className="small-left-margin status-tag" color="success">
                {task.status}
              </Tag>
            </h3>
          </Col>
          <Col lg={6}>
            <Row>
              <Col lg={8}>
                <Tooltip title="Delete task">
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={this.handleDeleteClick}
                    okText="Yes, Delete it."
                    cancelText="No"
                  >
                    <DeleteOutlined className="float-right task-icon" />
                  </Popconfirm>
                </Tooltip>
              </Col>
              <Col lg={8}>
                <Tooltip title="Edit task">
                  <EditOutlined
                    className="float-right task-icon"
                    onClick={this.handleEditTask}
                  />
                </Tooltip>
              </Col>
              <Col lg={8}>
                <Tooltip title="Mark as Completed">
                  <Popconfirm
                    title= {this.getCompletedTitle}
                    okText= "Yes, I confirm"
                    cancelText="No"
                    onConfirm={this.handleCompleteClick}
                  >
                    <Checkbox className="float-right completed-checkbox" checked={this.state.completed}/>
                  </Popconfirm>
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="small-top-margin">
          <Col lg={24}>Due on: {task.due_date}</Col>
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
