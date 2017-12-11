

const actionType = {
  //
  SET_SAMPLE_CONTENT: 'sample.setSampleContent',
  SET_SAMPLE_TITLE: 'sample.setSampleTitle',
  SET_SAMPLE_TEXT: 'sample.setSampleText',
};

const initialState = {
  //
  sampleContent: null,
};


function reducer(state = initialState, action) {
  //
  return {
    sampleContent: sampleReducer(state.sampleContent, action),
  };
}


function sampleReducer(sampleContentState, { type, payload }) {
  //
  switch (type) {
    case actionType.SET_SAMPLE_CONTENT:
      return payload.sampleContent;

    case actionType.SET_SAMPLE_TITLE:
      return {
        ...sampleContentState,
        title: payload.sampleTitle,
      };

    case actionType.SET_SAMPLE_TEXT:
      return {
        ...sampleContentState,
        text: payload.sampleText,
      };

    default:
      return sampleContentState;
  }
}

export default reducer;
export { actionType, reducer };
