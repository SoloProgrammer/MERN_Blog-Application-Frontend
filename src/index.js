import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Blogstate from './context/blog/Blogstate';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
      <Blogstate>
        <App />
      </Blogstate>
);


