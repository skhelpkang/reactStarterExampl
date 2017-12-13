import React, { Component } from 'react';

export default class SampleView2 extends Component {

  state ={
    title: '타이틀',
  }

  render() {
    const { title } = this.state

    return (
      <h2 style={styles.h2}>{title}</h2>
    )
  }
}

const styles = {
  h2:{
    fontWeight: 'normal',
    color: '#42b983',
  }
}

