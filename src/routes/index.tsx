import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
    
    const { googleUser, token } = useAuth();

    return (
        <NavigationContainer>
            {
                ( googleUser.id && token) ? <AppRoutes /> : <AuthRoutes />
            }
        </NavigationContainer>
    );
}

export { Routes }