import { actionType } from '../reducer/menuReducer';


const menuAction = {
  //
  selectMenu(menuItemName) {
    return {
      type: actionType.SET_ACTIVE_ITEM,
      payload: menuItemName,
    };
  },
};

export default { menuAction };
export { menuAction };
