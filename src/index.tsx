import React from 'react';
import ReactDOM from 'react-dom/client';
import {CookiesProvider} from 'react-cookie';
import {RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import router from 'navigation/router';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <React.Fragment>
        <React.Suspense fallback={<>Loading...</>}>
          <RouterProvider router={router} />
          <ToastContainer theme="colored" />
        </React.Suspense>
      </React.Fragment>
    </CookiesProvider>
  </React.StrictMode>,
);
