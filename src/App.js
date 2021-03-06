import logo from './logo.svg';
import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from './config/firebase';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      todos: [{title: "Mustafa" , edit: false}],
      value: '',
      name: ''
    }
  }
  addItems = () =>{
    // console.log(this.state.value)
    let obj = {title: this.state.value}
    this.setState({
      todos: [...this.state.todos,obj],
      value:''
    })
    firebase.database().ref("users").push(obj);
  }
  delete_item = (index,value) => {
    // console.log(index);
    this.state.todos.splice(index,1);
    this.setState({
      todos: this.state.todos
    })
    // console.log(value.id)
    firebase.database().ref("users").child(value.id).remove();
  }
  edit_item = (index,value) => {
    this.state.todos[index].edit = true;
    this.setState({
      todos: this.state.todos
    })
  }
  
  handle_change = (e,index) =>{
    // console.log(e.target.value,index);
    this.state.todos[index].title = e.target.value;
    this.setState({
      todos: this.state.todos
    })
  }
  update = (index,value) => {
    this.state.todos[index].edit = false;
    this.setState({
      todos: this.state.todos
    })
    // console.log(value.id);
    firebase.database().ref("users").child(value.id).set({
      title: value.title
    })
  }
  componentDidMount = ()=> {
    
    firebase.database().ref("users").on("child_added", data =>{
      this.state.todos.push({
        id : data.key,
        title: data.val().title
      })
      this.setState({
        todos: this.state.todos
      })
    })
  }
  
    render(){
    console.log(this.state.name);
    document.body.style.backgroundColor = "black";
    let {todos,value} = this.state;
    return(
      <div style={{
        border: "2px solid black",
        borderRadius: "20px",
        textAlign: "center",
        color: "white"
      }}>
        <h1 style={{  border: "5px solid #C63B3B", borderRadius: "5px"}}>Todo App</h1>
        <br/> 
         <input value={value} type="text" placeholder="Enter Items" onChange={(e)=>{this.setState({value:e.target.value})}} style={{height:"50px",fontSize:"20px",borderRadius:"10px" , color:"blue"}}/>
          <Button onClick={this.addItems} variant="outline-primary">Add Items</Button>
            <br/> 
            <br/> 
          <ul>
          {todos.map((v,i) => {
            return <li key={i} style={{listStyleType: "none"}}> 
              {v.edit?<input value={v.title} type="text" onChange={(e) => this.handle_change(e,i)} style={{height:"50px", width:"120px",fontSize:"20px",borderRadius:"10px",color:"red"}}/>: v.title}
              {v.edit? 
            <Button onClick={()=>this.update(i,v)} variant="outline-success">Update</Button>
            : 
            <Button onClick={()=>this.edit_item(i,v)} variant="outline-secondary">Edit</Button>
          }
            <Button onClick={()=> this.delete_item(i,v)} variant="outline-danger">Delete</Button>
            <hr style={{  border: "1px solid #C63B3B", borderRadius: "5px"}}/>
            </li>
          }
          )}
        </ul>
      </div>
    )
  }
}
export default App;
