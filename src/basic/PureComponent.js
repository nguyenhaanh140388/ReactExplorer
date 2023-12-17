import React, { Component } from "react";

let number = 0;

class ComponentWithPure extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      name: "React JS"
    };
  }

  handlerChangeName = () => {
    this.setState({ name: "React JS" + number++});
  };

  render() {
    console.log("FirstComponent -- Render method called");
    return (
      <div>
        <p> Name is : {this.state.name} </p>
        <button onClick={this.handlerChangeName}>Change Name</button>
      </div>
    );
  }
}

export default ComponentWithPure;