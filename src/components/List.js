import React, { Component } from "react";
import { Row, Col, Tooltip } from "antd";
import { getAllTasks, deleteTask, filterTask } from "../api/todo";
import CreateTaskModal from "./CreateTaskModal";
import Task from "./Task";
import {
  PlusOutlined,
  ArrowLeftOutlined,
  FilterOutlined,
  FilterFilled
} from "@ant-design/icons";
import ApplyFilterModal from "./ApplyFilterModal";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: JSON.parse(localStorage.getItem("selectedList")),
      isCreateTaskModalVisible: false,
      tasks: undefined,
      isFilterModalVisible: false,
    };
  }

  handleFilterClick = () => {
    this.setState({ isFilterModalVisible: true });
  };

  toggleFilterModalVisibility = async (
    value,
    progress = undefined,
    label = undefined,
    status = undefined,
    priority = undefined
  ) => {
    this.setState({ tasks: undefined });
    const response = await filterTask(
      this.state.selectedList.id,
      progress,
      label,
      status,
      priority
    );
    const filterObject = {
      progress,
      label,
      status,
      priority,
    };

    localStorage.setItem("filter", JSON.stringify(filterObject));
    this.setState({
      isFilterModalVisible: value,
      tasks: response.data,
    });
  };

  getTaskCount = () => {
    if (this.state.tasks === undefined) return 0;
    return this.state.tasks.length;
  };

  handleCreateNewTask = () => {
    this.setState({ isCreateTaskModalVisible: true });
  };

  toggleCreateTaskModalVisibility = async (value) => {
    this.setState({ tasks: undefined });
    const response = await getAllTasks(this.state.selectedList.id);
    this.setState({
      tasks: response.data,
      isCreateTaskModalVisible: false,
    });
  };

  reload = async () => {
    this.setState({ tasks: undefined })
    const filterObject = JSON.parse(localStorage.getItem("filter"));
    if (filterObject) {
      const response = await filterTask(
        this.state.selectedList.id,
        filterObject.progress,
        filterObject.label,
        filterObject.status,
        filterObject.priority
      );
      this.setState({ tasks: response.data });
    } else {
      const response = await getAllTasks(this.state.selectedList.id);
      this.setState({ tasks: response.data });
    }
  };

  handleDeleteTask = async (id) => {
    await deleteTask(id);
    this.setState({ tasks: undefined });
    const response = await getAllTasks(this.state.selectedList.id);
    this.setState({ tasks: response.data });
  };

  renderTasks = () => {
    return this.state.tasks.map((item) => {
      return <Task task={item} 
                handleDeleteTask={this.handleDeleteTask} 
                reload = {this.reload}/>;
    });
  };

  isFilterApplied = () => {
    
    const filter = localStorage.getItem('filter');
    if(filter === undefined || filter === null)
      return false;
    if(Object.keys(JSON.parse(filter)).length === 0)
      return false
    return true;
  }

  componentDidMount = async () => {
    
    const filterObject = JSON.parse(localStorage.getItem("filter"));
    if (filterObject) {
      const response = await filterTask(
        this.state.selectedList.id,
        filterObject.progress,
        filterObject.label,
        filterObject.status,
        filterObject.priority
      );
      this.setState({ tasks: response.data });
    } else {
      const response = await getAllTasks(this.state.selectedList.id);
      this.setState({ tasks: response.data });
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col lg={8}>
            <ArrowLeftOutlined
              className="back-icon"
              onClick={this.props.removeListSelection}
            />
          </Col>
          <Col lg={16}>
            <div className="list-container">
              <Row>
                <Col lg={18}>
                  <h2> {this.state.selectedList.name} </h2>
                </Col>
                <Col lg={6}>
                  <Tooltip title="Click here to create new task">
                    <PlusOutlined
                      className="float-right icon create-task-icon"
                      onClick={this.handleCreateNewTask}
                    />
                  </Tooltip>
                  {
                   
                    this.isFilterApplied()
                    ?<FilterFilled
                    className="float-right icon filter-icon"
                    onClick={this.handleFilterClick}
                  />
                    :<FilterOutlined
                    className="float-right icon filter-icon"
                    onClick={this.handleFilterClick}
                  />
                  }
                  
                </Col>
                {this.state.tasks === undefined ||
                this.state.tasks.length === 0 ? (
                  localStorage.getItem("filter") ? (
                    <p className="empty-tasks-msg">
                      It Seems there are no tasks for that filter.
                    </p>
                  ) : (
                    <p className="empty-tasks-msg">
                      <button
                        onClick={this.handleCreateNewTask}
                        className="create-new-task-link"
                      >
                        Click here
                      </button>
                      to create new tasks.
                    </p>
                  )
                ) : (
                  <div className="task-container">{this.renderTasks()}</div>
                )}
              </Row>
            </div>
          </Col>
        </Row>
        {this.state.isCreateTaskModalVisible && (
          <CreateTaskModal
            visible={this.state.visible}
            toggleCreateTaskModalVisibility={
              this.toggleCreateTaskModalVisibility
            }
            selectedList={this.state.selectedList}
          />
        )}

        {this.state.isFilterModalVisible && (
          <ApplyFilterModal
            visible={this.state.visible}
            toggleFilterModalVisibility={this.toggleFilterModalVisibility}
            selectedList={this.state.selectedList}
          />
        )}
      </div>
    );
  }
}
