import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {ToastContainer} from 'react-toastify';
import {store, persistor} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
            <ToastContainer position='top-right' autoClose={1000}/>
        </PersistGate>
    </Provider>
)
