import React, { Component, Fragment } from 'react'

class Users extends Component {
    constructor(props) {
        super(props)
            this.state = {users: [] }
    }
  
    getUsers(){
      fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => this.setState({users}))   
        .catch(err => console.log(err))
    }
    componentDidMount(){
        this.getUsers()
    }  
    render() {
        return (
            <Fragment>
                <div>
                    Users:
                    {this.state.users.map( (result )=> <p>{result.username}</p> )}
                </div>
            </Fragment>
        )}      
}
export default Users