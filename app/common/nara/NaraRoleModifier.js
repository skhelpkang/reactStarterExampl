
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';


class NaraRoleModifier extends Component {
  //
  static propTypes = {
    roles: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  };

  static defaultProps = {
    roles: [],
  };

  state = {
    accessible: false,
  };


  constructor(props) {
    super(props);
    autoBind(this);
  }


  componentDidMount() {
    //
    this.isAccessible(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //
    if (this.props.roles !== nextProps.roles) {
      this.isAccessible(nextProps);
    }
  }


  isAccessible(props) {
    //
    let accessible = false;

    if (Array.isArray(props.roles)) {
      // accessible = props.roles.some((role) => naraContext.hasRole(role));
    }
    else {
      // accessible = naraContext.hasRole(props.roles);
    }

    this.setState({ accessible });
  }


  render() {
    //
    const { children } = this.props;

    if (this.state.accessible !== true) {
      return null;
    }

    return children;
  }

}

export default NaraRoleModifier;
