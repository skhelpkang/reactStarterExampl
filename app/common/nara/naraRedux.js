
function action(type, payload) {
  return {
    type,
    payload,
  };
}

function dispatchToState(type, result) {
  //
  // Result is function that return the payload
  if (typeof result === 'function') {
    return (dispatch, getState) => Promise.resolve(dispatch(action(type, result(getState()))));
  }
  // Result is payload value
  else {
    return (dispatch) => Promise.resolve(dispatch(action(type, result)));
  }
}

function promiseAndDispatch(promise, ...onDispatch) {
  //
  return (dispatch, getState) => {
    const state = getState();

    return __recursivelyDispatch(onDispatch, 0, promise(state), dispatch);
  };
}

function __recursivelyDispatch(onThenList, currentIndex, prevPromise, dispatch) {
  //
  if (!Array.isArray(onThenList) || (onThenList.length) <= currentIndex) {
    return prevPromise;
  }

  const onThen = onThenList[currentIndex];
  const currentPromise = prevPromise.then((res) => {
    const dispatched = dispatch(onThen(res));

  if (dispatched && dispatched.payload) {
    return dispatched.payload;
  }
  else {
    return dispatched;
  }
});

  return __recursivelyDispatch(onThenList, currentIndex + 1, currentPromise, dispatch);
}


function promiseAndThen(promise, ...onThen) {
  //
  return (dispatch, getState) => {
    const state = getState();

    return __recursivelyThen(onThen, 0, promise(state), dispatch);
  };
}

function __recursivelyThen(onThenList, currentIndex, prevPromise, dispatch) {
  //
  if (!Array.isArray(onThenList) || (onThenList.length) <= currentIndex) {
    return prevPromise;
  }

  const onThen = onThenList[currentIndex];
  const currentPromise = prevPromise.then((res) => onThen(res, dispatch));

  return __recursivelyThen(onThenList, currentIndex + 1, currentPromise, dispatch);
}


export default action;
export { action, dispatchToState, promiseAndDispatch, promiseAndThen };
