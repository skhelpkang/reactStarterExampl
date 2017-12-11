
import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';


class PageNotFoundView extends Component {
  //
  render() {
    //
    return (
      <Container text={true}>
        <Header as="h1">{title}</Header>
        <p>{text}</p>
      </Container>
    );
  }
}

export default PageNotFoundView;
