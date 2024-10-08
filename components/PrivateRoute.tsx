import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    return user ? <>{children}</> : null;
};

export default PrivateRoute;
