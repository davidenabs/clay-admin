import './App.css';
import { Toaster } from "react-hot-toast";
import AppRoutes from "./Routes";
import AuthProvider from 'react-auth-kit';
import { store } from './store/auth';


function App() {
  return (
    <>
      <AuthProvider store={store}>
        <AppRoutes />
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
