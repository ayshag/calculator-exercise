import React, { Component } from 'react';
import '../../App.css';
import Button from 'react-bootstrap/lib/Button';
import evaluate from './Evaluate';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class Calculator extends Component {
    constructor() {
        super();
        this.state = {
        input : "",
        result : "",
           }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    handleInputChange = (e) =>
    {
        e.preventDefault();
        var setValue;
        if(e.target.value == "clear")
        {
            setValue = ""; 
            
        }
        else if(this.state.input!="")
        {
            setValue = this.state.input + e.target.value;
        }
        else
        {
            setValue = e.target.value;
        }

        this.setState({
            input : setValue,
            result : "" 
   
        })      ;
        
        
    }
    handleFormSubmit = (e) =>
    {
       e.preventDefault();
      var res = "Result : " + evaluate(this.state.input);
        this.setState({
            result : res
        })

    }
 
    render() {

        return (

            
            <div>
            <form onSubmit={this.handleFormSubmit}>
              
              {this.state.input}
              <div>
                  
                 
              <Button  onClick = {this.handleInputChange} value={0}>0</Button>
              <Button onClick = {this.handleInputChange} value={1}>1</Button>
              <Button onClick = {this.handleInputChange} value={2}>2</Button>
              <Button onClick = {this.handleInputChange} value={3}>3</Button>
              </div>
              <div>
              
              <Button onClick = {this.handleInputChange} value={4}>4</Button>
              <Button onClick = {this.handleInputChange} value={5}>5</Button>
              <Button onClick = {this.handleInputChange} value={6}>6</Button>
              <Button onClick = {this.handleInputChange} value={7}>7</Button>
             </div>
              <div>
             
              <Button onClick = {this.handleInputChange} value={8}>8</Button>
              <Button onClick = {this.handleInputChange} value={9}>9</Button>
              <Button onClick = {this.handleInputChange} value={"("}>(</Button>
              <Button onClick = {this.handleInputChange} value={")"}>)</Button>
              </div>
              
           
              <div>
              <Button onClick = {this.handleInputChange} value={"+"}>+</Button>
              <Button onClick = {this.handleInputChange} value={"-"}>-</Button>
              <Button onClick = {this.handleInputChange} value={"*"}>*</Button>
              <Button onClick = {this.handleInputChange} value={"/"}>/</Button></div>
              <div>
              <Button onClick = {this.handleInputChange} value={"."}>.</Button>
              <Button onClick = {this.handleInputChange} value={"sin"}>sin</Button>
              <Button onClick = {this.handleInputChange} value={"cos"}>cos</Button>
              <Button onClick = {this.handleInputChange} value={"tan"}>tan</Button>
              </div>
              <div><Button onClick ={this.handleInputChange} value ={"clear"}>clear</Button>
              <Button onClick = {this.handleFormSubmit}>=</Button></div>
             </form>
             {this.state.result}
                </div>
           

        )
    }
}
export default Calculator;
