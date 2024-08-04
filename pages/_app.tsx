import '../styles/globals.css'; 
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Script from 'next/script';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AuthProvider>
            <Navbar />
            <Script
                id="MathJax-script"
                async
                src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
            />
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default MyApp;
