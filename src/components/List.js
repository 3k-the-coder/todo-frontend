import React, { Component } from "react";
import { Row, Col, Tooltip, Input, Spin, message } from "antd";
import { getAllTasks, deleteTask, filterTask } from "../api/todo";
import CreateTaskModal from "./CreateTaskModal";
import Task from "./Task";
import { LoadingOutlined } from "@ant-design/icons";

import {
  PlusOutlined,
  ArrowLeftOutlined,
  FilterOutlined,
  FilterFilled,
  SearchOutlined,
} from "@ant-design/icons";
import ApplyFilterModal from "./ApplyFilterModal";

const { Search } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: JSON.parse(localStorage.getItem("selectedList")),
      isCreateTaskModalVisible: false,
      tasks: undefined,
      isFilterModalVisible: false,
      isSearchClicked: false,
      searchString: undefined,
      loading: true,
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
    this.setState({ loading: true });
    try {
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
        loading: false,
      });
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  getTaskCount = () => {
    if (this.state.tasks === undefined) return 0;
    return this.state.tasks.length;
  };

  handleCreateNewTask = () => {
    this.setState({ isCreateTaskModalVisible: true });
  };

  toggleCreateTaskModalVisibility = async (value) => {
    this.setState({ loading: true });
    try {
      const response = await getAllTasks(this.state.selectedList.id);
      this.setState({
        tasks: response.data,
        isCreateTaskModalVisible: false,
        loading: false,
      });
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  reload = async () => {
    this.setState({ loading: true });
    const filterObject = JSON.parse(localStorage.getItem("filter"));
    try {
      if (filterObject) {
        const response = await filterTask(
          this.state.selectedList.id,
          filterObject.progress,
          filterObject.label,
          filterObject.status,
          filterObject.priority
        );
        this.setState({
          tasks: response.data,
          loading: false,
        });
      } else {
        const response = await getAllTasks(this.state.selectedList.id);
        this.setState({
          tasks: response.data,
          loading: false,
        });
      }
    } catch (err) {
      message.error("Something went wrong.");
    }
  };

  handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
    } catch (err) {
      message.error("Can't delete the task, Please try again later");
    }

    this.setState({ loading: true });
    try {
      const response = await getAllTasks(this.state.selectedList.id);
      this.setState({
        tasks: response.data,
        loading: false,
      });
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  renderTasks = () => {
    return this.state.tasks.map((item) => {
      return (
        <Task
          task={item}
          handleDeleteTask={this.handleDeleteTask}
          reload={this.reload}
        />
      );
    });
  };

  isFilterApplied = () => {
    const filter = localStorage.getItem("filter");
    if (filter === undefined || filter === null) return false;
    if (Object.keys(JSON.parse(filter)).length === 0) return false;
    return true;
  };

  componentDidMount = async () => {
    const filterObject = JSON.parse(localStorage.getItem("filter"));
    try {
      if (filterObject) {
        const response = await filterTask(
          this.state.selectedList.id,
          filterObject.progress,
          filterObject.label,
          filterObject.status,
          filterObject.priority
        );
        this.setState({
          tasks: response.data,
          loading: false,
        });
      } else {
        const response = await getAllTasks(this.state.selectedList.id);
        this.setState({
          tasks: response.data,
          loading: false,
        });
      }
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  handleSearchClick = () => {
    this.setState({
      isSearchClicked: true,
    });
  };

  matchTasksWithSearchString = (value) => {
    const tasks = this.state.tasks.filter((item) => item.name.match(value));
    this.setState({
      isSearchClicked: false,
      tasks: tasks,
    });
  };

  renderListContents = () => {
    return (
      <Row>
        <Col lg={14} md={18} sm={18} xs={18}>
          <h2> {this.state.selectedList.name} </h2>
        </Col>
        <Col lg={10} md={6} sm={6} xs={6}>
          {this.state.isSearchClicked ? (
            <Search
              placeholder="search tasks"
              onSearch={(value) => this.matchTasksWithSearchString(value)}
            />
          ) : (
            <Row>
              <Col span={8}>
                <Tooltip title="Search tasks by name">
                  <SearchOutlined
                    className="search-icon float-right"
                    onClick={this.handleSearchClick}
                  />
                </Tooltip>
              </Col>

              <Col span={8}>
                {this.isFilterApplied() ? (
                  <Tooltip title="Remove or add more filters">
                    <FilterFilled
                      className="float-right icon filter-icon"
                      onClick={this.handleFilterClick}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Apply filters">
                    <FilterOutlined
                      className="float-right icon filter-icon"
                      onClick={this.handleFilterClick}
                    />
                  </Tooltip>
                )}
              </Col>
              <Col span={8}>
                <Tooltip title="New Task">
                  <PlusOutlined
                    className="float-right icon create-task-icon"
                    onClick={this.handleCreateNewTask}
                  />
                </Tooltip>
              </Col>
            </Row>
          )}
        </Col>
        {this.state.tasks === undefined || this.state.tasks.length === 0 ? (
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
    );
  };

  render() {
    return (
      <div>
        <Row>
          <Col lg={8} md={4} sm={4} xs={4}>
            <ArrowLeftOutlined
              className="back-icon"
              onClick={this.props.removeListSelection}
            />
          </Col>
          <Col lg={16} md={20} sm={20} xs={20}>
            <div className="list-container">
              {this.state.loading ? (
                <div className="loader-container center-align">
                  {" "}
                  <Spin indicator={antIcon} />{" "}
                </div>
              ) : (
                this.renderListContents()
              )}
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
