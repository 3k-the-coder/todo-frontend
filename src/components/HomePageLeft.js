import React, { Component } from 'react'
import {Button} from 'antd';
import RegistrationModal from './RegistrationModal';
import LoginModal from './LoginModal';

export default class HomePageLeft extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isLoginModalVisible: false,
            isRegisterModalVisible: false
        }
    }

    handleRegisterClick = () =>{
        this.setState({ isRegisterModalVisible: true })
    }

    toggleRegisterModalVisibility = (value) => {
        this.setState({ isRegisterModalVisible: value })
    }

    handleLoginClick = () => {
        this.setState({ isLoginModalVisible : true })
    }

    toggleLoginModalVisibility = (value) => {
        this.setState({ isLoginModalVisible: value })
    }

    render() {
        return (
            <div className="home-page-left">
                <h1 className="home-page-heading"> TO DO TRACKER </h1>
                <p className="home-page-information">
                Worried about keeping track of tasks.
                Don't worry, we have you covered. <br/>
                If you use our highly efficient to do tracker, we assure you that you will never forget a 
                single task.
                <br/>
                So what are you waiting for ? <br/>
                Click on register to enjoy the todo tracker.
                </p>
                <Button type="primary" 
                        className="home-page-btn login-btn"
                        onClick={this.handleLoginClick}
                >
                    
                     Login 
                     
                </Button>
                <Button 
                    type ="primary" 
                    className="home-page-btn register-btn"
                    onClick={this.handleRegisterClick}
                > 
                Register 
                </Button>

                {
                    this.state.isRegisterModalVisible &&
                    <RegistrationModal visible={this.state.isRegisterModalVisible}
                                        toggleRegisterModalVisibility = {this.toggleRegisterModalVisibility}
                    />
                }
                {
                    this.state.isLoginModalVisible && 
                    <LoginModal visible={this.state.isLoginModalVisible}
                                toggleLoginModalVisibility = {this.toggleLoginModalVisibility}
                    />
                }
            </div>
        )
    }
}
