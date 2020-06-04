import React, { Component } from "react";
import { Modal, Button, Progress, Spin, Row, Col, Popconfirm, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getUserPerformance, emailUserPerformace } from "../api/todo";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      name: undefined,
      description: undefined,
      performance_details: undefined,
    };
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.toggleProfileModalVisibility();
  };

  handleOk = async () => {
      try{
        await emailUserPerformace(localStorage.getItem("email"))
        message.success("Email sent successfully")
        this.setState({ visible: false });
        this.props.toggleProfileModalVisibility();
      }
      catch(err)
      {
          message.error("Something went wrong, Please try again later")
      }

  };

  getProgressPercent = () => {
    if (this.state.performance_details.total_tasks === 0) return 0;
    return (
      (this.state.performance_details.completed_tasks /
        this.state.performance_details.total_tasks) *
      100
    );
  };
  componentDidMount = async () => {
    const response = await getUserPerformance(localStorage.getItem("email"));
    this.setState({ performance_details: response.data });
  };

  render() {
    return (
      <Modal
        className="profile-modal"
        visible={this.state.visible}
        title={"Hi " + localStorage.getItem("name")}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Go back
          </Button>,
          <Popconfirm
          title={"We will email the report to your registered mail " + localStorage.getItem("email")}
          onConfirm={this.handleOk}
          okText="Yes, Send it."
          cancelText="Don't send"
        >
          <Button key="submit" type="primary">
            Email the report
          </Button>
          </Popconfirm>
          
        ]}
      >
        {this.state.performance_details === undefined ? (
          <div className="profile-loader-container">
            {" "}
            <Spin indicator={antIcon} />{" "}
          </div>
        ) : (
          <div>
            <Row>
              <Col span={12} className="center-align">
                <h4> Your report </h4>
                <Progress type="circle" percent={this.getProgressPercent()} className="small-top-margin"/>
              </Col>
              <Col span={12} className="center-align report-container">
                <Row className="small-top-margin">
                  <span>
                   
                    Total tasks: {
                      this.state.performance_details.total_tasks
                    }
                  </span>
                </Row>
                <Row className="small-top-margin green-text">
                  <span>
                    
                    completed tasks: {
                      this.state.performance_details.completed_tasks
                    }
                  </span>
                </Row>
                <Row className="small-top-margin yellow-text">
                  <span>
                    
                    incomplete tasks: {
                      this.state.performance_details.active_tasks
                    }
                  </span>
                </Row>
                <Row className="small-top-margin warning-text">
                  <span>
                    
                    late tasks: {
                      this.state.performance_details.late_tasks
                    }
                  </span>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    );
  }
}
