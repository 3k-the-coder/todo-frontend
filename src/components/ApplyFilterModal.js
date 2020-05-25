import React, { Component } from "react";
import { Row, Col, Select, Modal, Button } from "antd";

const { Option } = Select;

export default class ApplyFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      progress: undefined,
      label: undefined,
      status: undefined,
      priority: undefined

    };
  }
  handleRemoveFilter = () => {
    localStorage.removeItem('filter');
    this.setState({ visible: false });
    this.props.toggleFilterModalVisibility(false);
  }

  handleCancel = () => {
    
    this.setState({ visible: false });
    this.props.toggleFilterModalVisibility(false);
  };

  handleOk = async () => {

    this.setState({ visible: false });
    this.props.toggleFilterModalVisibility(false, this.state.progress, this.state.label, this.state.status, this.state.priority);
  };

  handleLabelChange = (value) => {
    this.setState({ label: value });
  };

  handleStatusChange = (value) => {
    this.setState({ status: value });
  };

  handleProgressChange = (value) => {
    this.setState({ progress: value });
  };

  handlePriorityChange = (value) => {
    this.setState({ priority: value });
  };

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title="Apply Filters"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="remove-filter" className="float-left" onClick={this.handleRemoveFilter}> 
            Remove Filter 
          </Button>,
          
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
            Submit
          </Button>,
        ]}
      >
          <Row>
              <span className="information-text"> * You can select one or combination of more than one filters </span>
          </Row>
        <Row className="form-top-margin-3vh">
          <Col lg={4}>
            <label for="label"> Progress </label>
          </Col>
          <Col lg={20}>
            <Select
              placeholder="Select Progress Filter"
              optionFilterProp="children"
              onChange={this.handleProgressChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Completed">Completed</Option>
              <Option value="Active">Active</Option>
            </Select>
          </Col>
        </Row>

        <Row className="form-top-margin-3vh">
          <Col lg={4}>
            <label for="progress"> Label: </label>
          </Col>
          <Col lg={20}>
            <Select
              showSearch
              placeholder="Select label filter"
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
              placeholder="Select status filter"
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
            <label for="priority"> Priority: </label>
          </Col>
          <Col lg={20}>
            <Select
              showSearch
              placeholder="Select priority filter"
              optionFilterProp="children"
              onChange={this.handlePriorityChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Tomorrow">Due Tomorrow</Option>
              <Option value="Week">Due this week</Option>
              <Option value="Month">Due this month</Option>
            </Select>
          </Col>
        </Row>
      </Modal>
    );
  }
}
