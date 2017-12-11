
import React, {Component} from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container } from 'semantic-ui-react'

import MenuContainer from "./MenuContainer";

import { menuAction } from "../action/menuAction";


class LayoutContainer extends Component {
  //
  constructor(props) {
    //
    super(props);
    autoBind(this);
  }

  // @Override
  componentDidMount() {
    const currentUserId = this.props.params.userId;

    if (currentUserId) {
      const currentUser = this.props.users.find((user) => user.id === currentUserId);
      this.props.userAction.selectCurrentUser(currentUser);
    }
  }


  render() {
    const { children } = this.props;

    return (
      <div>

        <MenuContainer
          {...this.props}
        />

        <Container>
          {children}
        </Container>

      </div>
    );
  }
}

const mapStateToProps = ({  }) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    menuAction: bindActionCreators(menuAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
