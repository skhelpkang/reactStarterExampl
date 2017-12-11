

const actionType = {
  //
  SET_ACTIVE_ITEM: 'menu.activeItem',
};

const initialState = {
  //
  activeItem: null,
};


function reducer(state = initialState, action) {
  //
  return {
    activeItem: menuReducer(state.activeItem, action),
  };
}


function menuReducer(menuActiveState, { type, payload }) {
  //
  switch (type) {
    case actionType.SET_ACTIVE_ITEM:
      return payload;

    default:
      return menuActiveState;
  }
}


export default reducer;
export { actionType, reducer };
