
import { actionType } from '../reducer/userReducer';
import userApi from '../api/userApi';


const role = {
  Admin: { value: 'Admin' },
  User: { value: 'User' },
};

const userConst = {
  //
  role,
  roles: [role.Admin, role.User],
};

const userAction = {
  //
  findUser(userId) {
    //
    return (dispatch) => userApi.findUser_sample(userId)
      .then((user) => {
        dispatch({
          type: actionType.SET_USER,
          payload: { user },
        });
      });
  },

  findAllUsers() {
    //
    return (dispatch) => userApi.findAllUsers_sample()
      .then((users) => {
        dispatch({
          type: actionType.SET_USERS,
          payload: { users },
        });
      });
  }
};

export default { userAction, userConst };
export { userAction, userConst };
