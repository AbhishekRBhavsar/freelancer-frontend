// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   // </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// reportWebVitals();