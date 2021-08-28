import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import App from './components/App';

import 'config/apiConfig';
import 'config/colorLog';
import 'styles/index.scss';
import configureStore from './config/storeConfig';
import { faker } from 'store/actions/appActions';
const store = configureStore();
setInterval( () => {
    store.dispatch( faker() );
}, 1000 );

render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={ store }>
                <App />
            </Provider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById( 'root' )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
