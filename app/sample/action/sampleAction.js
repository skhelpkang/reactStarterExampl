
import { actionType } from '../reducer/sampleReducer';
import sampleApi from '../api/sampleApi';


const sampleAction = {
  //
  findSampleContent(pageName) {
    //
    return (dispatch) => sampleApi.findSampleContent(pageName)
      .then((sampleContent) => {
        dispatch({
          type: actionType.SET_SAMPLE_CONTENT,
          payload: { sampleContent },
        });
      });
  },

  setSampleTitle(sampleTitle) {
    //
    return {
      type: actionType.SET_SAMPLE_TITLE,
      payload: {
        sampleTitle: sampleTitle,
      },
    };
  },

  setSampleText(sampleText) {
    //
    return {
      type: actionType.SET_SAMPLE_TEXT,
      payload: {
        sampleText: sampleText,
      },
    };
  },

};

export default { sampleAction };
export { sampleAction };
