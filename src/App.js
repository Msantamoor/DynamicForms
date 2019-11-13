import React, { Component } from 'react';
import DynamicForm from './components/DynamicForm';
import './App.css';

class App extends Component {
  state = {
    data:[
    //   {
    //   id: 1, 
    //   fname:"Morgan", 
    //   lname:"Santamoor", 
    //   email:"msantamoor@gmail.com", 
    //   phone:"", 
    //   age:"21"
    // },
    ]
  }

  onSubmit = (model) => {
    model.id = +new Date();
    alert(JSON.stringify(model, ["fname", "lname", "email", "phone", "age"], 2));
    this.setState({
      data: [model, ...this.state.data]
    })
  }

  render(){
  return (
    <div className="App">
     <DynamicForm className="form"
     title = "Registration"
     model={[
       {key: "fname", label: "First Name", type: "text", props: {required: true}},
       {key: "lname", label: "Last Name", type: "text", props: {required: true}},
       {key: "email", label: "Email Address", type: "text", props: {required: true}},
       {key: "phone", label: "Phone Number", type: "tel", props: {required: false}},
       {key: "age", label: "Age", type: "number", props: {min:0, max: 100}},
       {key: "password", label: "Create Password", type: "password", props: {required: true}},
       {key: "cpassword", label: "Confirm Password", type: "password", props: {required: true}},
     ]}
       onSubmit = {(model) => {this.onSubmit(model)}}
       /> 

       <pre>
         {JSON.stringify(this.state.data, ["fname", "lname", "email", "phone", "age"], 2)}
       </pre>
    </div>
  );
}
}
export default App;
