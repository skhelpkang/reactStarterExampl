

const actionType = {
  //
  SET_USER: 'user.setUser',
  SET_USERS: 'user.setUsers',
};

const initialState = {
  //
  user: null,
  users: [],
};


function reducer(state = initialState, action) {
  //
  return {
    user: userReducer(state.user, action),
    users: usersReducer(state.users, action),
  };
}


function userReducer(userState, { type, payload }) {
  //
  switch (type) {
    case actionType.SET_USER:
      return payload.user;

    default:
      return userState;
  }
}

function usersReducer(usersState, { type, payload }) {
  //
  switch (type) {
    case actionType.SET_USERS:
      return payload.users;

    default:
      return usersState;
  }
}


export default reducer;
export { actionType, reducer };
