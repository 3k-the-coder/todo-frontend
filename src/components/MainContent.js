import React, { Component } from 'react'
import { getAllLists } from '../api/todo'
import CreateListModal from './CreateListModal';
import UserLists from './UserLists';

export default class MainContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            lists: undefined,
            createListModalVisible: false
        }
    }

    componentDidMount = async () => {
        const response = await getAllLists(localStorage.getItem('email'));
        this.setState({lists: response.data});
    }


    handleCreateNewList = () => {
        this.setState({ createListModalVisible: true })
    }

    toggleCreateModalVisibility = async (value, shouldReload) => {

        this.setState({ lists: undefined})
        const response = await getAllLists(localStorage.getItem('email'));
        this.setState({
            lists: response.data,
            createListModalVisible: false

        });


    } 

    
    render() {
        return (
            <div className="main-content">
                    {
                        this.state.lists === undefined || this.state.lists.length === 0
                        ? <p className="empty-lists-msg"> It seems You haven't created any lists. What are you waiting for? <br/>
                            <button onClick={this.handleCreateNewList} 
                                className="create-new-list-link"> Click here</button>  to create new lists.
                             </p>
                        : <UserLists lists={this.state.lists} 
                            handleCreateNewList = {this.handleCreateNewList}
                            handleListSelection={this.props.handleListSelection}
                        />
                            
                         
                        
                    }

                    {
                        this.state.createListModalVisible &&
                        <CreateListModal visible={this.state.createListModalVisible}
                            toggleCreateModalVisibility={this.toggleCreateModalVisibility} 
                        />

                    }
            </div>
        )
    }
}
