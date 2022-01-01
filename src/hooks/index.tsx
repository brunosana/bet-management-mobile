import React, { ReactNode } from 'react';
import { ApiProvider } from './api';
import { AuthProvider } from './auth';

interface IHooks {
    children: ReactNode;
}

const Hooks: React.FC<IHooks> = ({ children }) => {
    return (
        <>
            <AuthProvider>
                <ApiProvider>
                    {children}
                </ApiProvider>
            </AuthProvider>
        </>
    );
}

export { Hooks };