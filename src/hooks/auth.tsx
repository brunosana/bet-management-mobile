import React, { useContext, createContext, ReactNode } from 'react';

import * as AuthSession from 'expo-auth-session';

interface IAuthProvider{
    children: ReactNode;
}

interface IUser {
    id: string;
    email: string;
    name: string;
    photo?: string;
}

interface IAuthContextData {
    user: IUser;
    signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider ({ children }: IAuthProvider) {
    
    const user = {
        id: '123456789',
        name: 'sana',
        email: 'sana@sana.com'
    }

    async function signInWithGoogle(){
        try {
            const CLIENT_ID = '';
            const REDIRECT_URI = 'https://auth.expo.io/@brunosana/betcontrol';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const REDIRECT_URL_PART = '&redirect_uri=' + REDIRECT_URI;
            const CLIENT_ID_PART = '&client_id='+ CLIENT_ID;
            const RESPONSE_TYPE_PART = '&response_type='+ RESPONSE_TYPE;
            const SCOPE_PART = '&scope=' + SCOPE;

            //const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            const authUrl =
                'https://accounts.google.com/o/oauth2/v2/auth?'
                + REDIRECT_URL_PART
                + CLIENT_ID_PART
                + RESPONSE_TYPE_PART
                + SCOPE_PART;
            const response = await AuthSession.startAsync({ authUrl });

            console.log(response);

        }catch(error: any){
            throw new Error(error);
        }
    }

    return (
    <AuthContext.Provider
        value={
            {
                user,
                signInWithGoogle
            }
        }
      >
          { children }
      </AuthContext.Provider>
    );
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }
