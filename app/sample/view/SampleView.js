
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';


class SampleView extends Component {
  //
  static propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
  };

  render() {
    //
    const { title, text } = this.props;

    return (
      <Container text={true}>
        <Header as="h1">{title}</Header>
        <p>{text}</p>
      </Container>
    );
  }
}

export default SampleView;
