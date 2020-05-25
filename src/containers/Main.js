import React, { Component } from 'react'
import Header from './../components/Header';
import Footer from './../components/Footer';
import List from '../components/List';
import MainContent from './../components/MainContent';

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            isListSelected: false,
        }
    }

    handleListSelection = async (selectedList) => {
        localStorage.setItem('selectedList', JSON.stringify(selectedList));
        this.setState({ isListSelected: true })
    }

    removeListSelection = () => {
        localStorage.removeItem('selectedList');
        this.setState({ isListSelected: false })

    }

    render() {
        return (
            <div>
               <Header/>
               {
                    (localStorage.getItem('selectedList'))
                   ? <List removeListSelection={this.removeListSelection} 
                            selectedList={this.state.selectedList}
                    />
                   : <MainContent handleListSelection={this.handleListSelection}/>
               }
               <Footer/>
            </div>
        )
    }
}
