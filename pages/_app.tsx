import '../styles/globals.css'; 
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AuthProvider>
            <Navbar />
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default MyApp;
