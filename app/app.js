
// JavaScript
import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory, Router, Route, IndexRoute, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';

// Base
import Layout from './layout/container/LayoutContainer';
import PageNotFoundView from './common/view/PageNotFoundView';

// Page
import Sample from './sample/container/SampleContainer';



const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={"/"} component={Layout} >

        <IndexRedirect to="sample" />

        <Route path="sample" component={Sample} />

        <Route path="menus/:menuName" >
          <IndexRoute component={Sample} />
        </Route>

      </Route>

      <Route path="*" component={PageNotFoundView}/>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
