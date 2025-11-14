// hooks/useAuth.js

import { useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    const login = async (email, password) => {
        const session = await account.createEmailPasswordSession({
            email,
            password,
            scopes: ['tables.read', 'tables.write', 'collections.read']
        });
        setCurrentUser(session);
        router.push('/');
    };

    const logout = async () => {
        await account.deleteSession('current');
        setCurrentUser(null);
        router.push('/login');
    };

    const getCurrentUser = async () => {
        try {
            const user = await account.get();
            setCurrentUser(user);
        } catch (error) {
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return {
        currentUser,
        loading,
        login,
        logout
    };
}
