import React from 'react';

import './App.css';
import { Application } from './components/app/app'
import ErrorBoundary from './utils/error-boundary';



function App() {

  return (
    <div className="App">
      <ErrorBoundary>

          <Application /> 

      </ErrorBoundary>
   </div>
    
  );
}

export default App;
