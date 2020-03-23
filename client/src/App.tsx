import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Core from "./core/Core";
import {store} from "./shared/state/store";
import {Provider} from "react-redux";

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <Core />
      </Provider>);
};

export default App;
