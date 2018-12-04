
import React, { Component } from 'react';


class Stack extends Component {



    // this.head = data ? new Node(data) : null;
    // this.length = data ? 1 : 0;


  // push(data) {
  // const newNode = new Node("1");
  // if(!this.head) {
  //   this.head = newNode;
  //   return newNode;
  // };
  //
  // //set next for current head
  // newNode.next = this.head;
  // //set head to new node so it is top of stack
  // this.head = newNode;
  // return this.head
  // };
  //
  // pop() {
  //   if(!this.head) {
  //     throw new Error("stack is empty");
  //   };
  //   const poppedNode = this.head; // set node to be removed to new var.
  //   this.head = poppedNode.next // set head of stacj to next node in stack;
  //   return poppedNode;
  // }

  render() {
    console.log(this);
    return (
      <div className="App">
        Stacks

      </div>
    );
  }
}

export default Stack;
