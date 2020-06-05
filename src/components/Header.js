import React, { Component } from "react";
import { Row, Col, Button, Menu, Dropdown } from "antd";
import history from "../history";
import DeleteAccountModal from "./DeleteAccountModal";
import ProfileModal from "./ProfileModal";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteAccountModalVisible: false,
      isProfileModalVisible: false,
    };
  }

  handleLogoutClick = () => {
    localStorage.clear();
    history.push("/");
  };
  handleDeleteAccountClick = () => {
    this.setState({ isDeleteAccountModalVisible: true });
  };

  toggleDeleteAccountModalVisibility = () => {
    this.setState({ isDeleteAccountModalVisible: false });
  };

  handleProfileClick = () => {
    this.setState({ isProfileModalVisible: true });
  };

  toggleProfileModalVisibility = () => {
    this.setState({ isProfileModalVisible: false });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.handleProfileClick}>
          {localStorage.getItem("name")}
        </Menu.Item>
        
          <Menu.Item key="2" onClick={this.handleLogoutClick}>
              Logout
          </Menu.Item>
        
        <Menu.Item key="3" onClick={this.handleDeleteAccountClick}>
          Delete Account
        </Menu.Item>
      </Menu>
    );
    return (
      <header className="header">
        <Row>
          <Col lg={12} md={16} sm={16} xs={16}>
            <h4 className="header-logo"> TODO TRACKER </h4>
            <span className="header-tagline">
              {" "}
              Your one stop solution, to getting things done..{" "}
            </span>
          </Col>
          <Col lg={12} md={8} sm={8} xs={8}>
            <Dropdown overlay={menu}>
              <Button className="user-button float-right">
                {localStorage.getItem("name").charAt(0)}
              </Button>
            </Dropdown>
          </Col>
        </Row>

        {this.state.isDeleteAccountModalVisible && (
          <DeleteAccountModal
            visible={this.state.isDeleteAccountModalVisible}
            toggleDeleteAccountModalVisibility={
              this.toggleDeleteAccountModalVisibility
            }
          />
        )}

        {this.state.isProfileModalVisible && (
          <ProfileModal
            visible={this.state.isProfileModalVisible}
            toggleProfileModalVisibility={
              this.toggleProfileModalVisibility
            }
          />
        )}
      </header>
    );
  }
}
