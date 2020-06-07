import React, { Component } from "react";
import {
  Col,
  Row,
  Tooltip,
  notification,
  Button,
  message,
  Popconfirm,
} from "antd";
import { EditOutlined, BellFilled, DeleteOutlined } from "@ant-design/icons";
import { subscribe } from "../api/todo";

export default class UserLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: this.props.lists,
    };
  }

  renderLists = () => {
    return this.state.lists.map((item, index) => {
      return (
        <Col lg={7} md={12} sm={12} xs={20}>
          <div className="list-detail">
            <Row>
              <Col span={18}>{item.name}</Col>
              <Col span={3}>
                <Tooltip title="Edit">
                  <EditOutlined
                    className="list-edit-icon"
                    onClick={() => this.props.handleListSelection(item)}
                  />
                </Tooltip>
              </Col>
              <Col span={3}>
                <Popconfirm
                  title="This will delete the selected list. Are you sure?"
                  onConfirm={() => this.props.handleDeleteListClick(item)}
                  okText="Yes, Delete it."
                  cancelText="No"
                >
                  <DeleteOutlined className="float-right delete-list-icon" />
                </Popconfirm>
              </Col>
            </Row>
          </div>
        </Col>
      );
    });
  };

  handleSubscriptionClick = async (isSubscribed) => {
    try {
      localStorage.setItem("isSubscribed", !isSubscribed);

      await subscribe(localStorage.getItem("email"), !isSubscribed);
      if (!isSubscribed) message.success("Subscribed successfully");
      notification.close("subscribe");
    } catch (err) {
      message.error("Something went wrong, Please try again later");
    }
  };

  handleNotificationClick = () => {
    let isSubscribed = localStorage.getItem("isSubscribed");
    isSubscribed = isSubscribed === "true";
    if (!isSubscribed) {
      notification.open({
        key: "subscribe",
        message: "Subscribe to get reminders",
        description: (
          <div>
            <p>
              If you think you can't keep track of the tasks, subscribe to get
              frequent reminders
            </p>
            <Button
              type="primary"
              onClick={() => this.handleSubscriptionClick(isSubscribed)}
            >
              Subscribe
            </Button>
          </div>
        ),
        duration: 0,
      });
    } else {
      notification.open({
        key: "subscribe",
        message: "Unsubscribe",
        description: (
          <div>
            <p>
              You have subscribed to recieve reminders. Click here to
              Unsubscribe.
            </p>
            <Button
              type="primary"
              onClick={() => this.handleSubscriptionClick(isSubscribed)}
            >
              Unsubscribe
            </Button>
          </div>
        ),
        duration: 0,
      });
    }
  };

  render() {
    return (
      <div className="user-list-content">
        <Row>
          <Col span={16}>
            <h2> YOUR LISTS </h2>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={12}></Col>
              <Col span={12}>
                <BellFilled
                  className="subscription-icon float-right"
                  onClick={this.handleNotificationClick}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <br />
        <Row>
          <Col lg={7} md={12} sm={12} xs={20}>
            <div
              className="list-detail create-new-list-div"
              onClick={this.props.handleCreateNewList}
            >
              Create new list
            </div>
          </Col>
          {this.renderLists()}
        </Row>
      </div>
    );
  }
}
