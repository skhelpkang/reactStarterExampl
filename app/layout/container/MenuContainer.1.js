
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Select, Dropdown } from 'semantic-ui-react'

import { userConst, userAction } from '../../user/action/userAction';
import { menuAction } from '../action/menuAction';


class MenuContainer extends Component {
  //
  static menuItems = [
    { name: 'AdminMenu1', text: 'AdminMenu1',  role: 'Admin', onClickName: 'routeToAdminMenu1' },
    { name: 'AdminMenu2', text: 'AdminMenu2', role: 'Admin', onClickName: 'routeToAdminMenu2' },

    { name: 'UserMenu1',  text: 'UserMenu1',    role: 'User', onClickName: 'routeToUserMenu1' },
    { name: 'UserMenu2',   text: 'UserMenu2',     role: 'User', onClickName: 'routeToUserMenu2' },
  ];


  constructor(props) {
    //
    super(props);
    autoBind(this);
  }


  // @Override
  componentDidMount() {
    //
    const userId = 'admin';
    const { params } = this.props;

    this.props.userAction.findAllUsers();
    this.props.userAction.findUser(userId);

    if (params.menuName) {
      this.props.menuAction.selectMenu(params.menuName);
    }
  }

  // @Override
  componentWillReceiveProps(nextProps) {
    //
    if (this.props.params.menuName !== nextProps.params.menuName) {
      this.props.menuAction.selectMenu(nextProps.params.menuName);
    }
  }



  onChangeUser(e, { value }) {
    this.props.userAction.findUser(value);
  }

  routeToHome() {
    this.props.router.push('/');
  }

  routeToMenuPage(e, { name }) {
    //
    this.props.router.push(`/menus/${name}`);
  }


  render() {

    const { users } = this.props;

    return (
      <div className="hello">
        <ul>
          { users.map((user) => {
              return (
                <li key={user.id}>
                  {user.name}
                </li>
              )
          })}
        </ul>
      </div>
    )
    
  }

}


const mapStateToProps = ({ menuState, userState }) => {
  return {
    activeItem: menuState.activeItem,
    users: userState.users,
    user: userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    menuAction: bindActionCreators(menuAction, dispatch),
    userAction: bindActionCreators(userAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
