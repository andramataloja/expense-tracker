import React, { Component, Box } from "react";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  getUsers() {
    fetch("http://localhost:3000/users")
      .then(response => response.json())
      .then(users => this.setState({ users }))
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getUsers();
  }
  render() {
    return (
      <Box>
        Users:
        {this.state.users.map(result => (
          <p>{result.username}</p>
        ))}
      </Box>
    );
  }
}
export default Users;
