
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sampleAction } from '../action/sampleAction';
import Sample from '../view/SampleView';


class SampleContainer extends Component {
  //
  constructor(props) {
    super(props);
    autoBind(this);
  }


  // @Override
  componentDidMount() {
    //
    this.init(this.props);
  }

  // @Override
  componentWillReceiveProps(nextProps) {
    //
    if (this.props.params.menuName !== nextProps.params.menuName) {
      this.init(nextProps);
    }
  }

  init(props) {
    //
    const pageName = props.params.menuName || '';

    props.sampleAction.findSampleContent(pageName);
  }


  render() {
    //
    const { sampleContent } = this.props;

    if (!sampleContent) {
      return null;
    }

    return (
      <Sample
        title={sampleContent.title}
        text={sampleContent.text}
      />
    );
  }
}

const mapStateToProps = ({ sampleState }) => {
  return {
    sampleContent: sampleState.sampleContent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sampleAction: bindActionCreators(sampleAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleContainer);

