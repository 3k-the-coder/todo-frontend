import React, { Component } from 'react'
import todo from './../images/todo.png' 
export default class HomePageRight extends Component {
    render() {
        return (
            <div className="home-page-right">
                <img src={todo} alt="todo" className="todo-img" />
            </div>
        )
    }
}
