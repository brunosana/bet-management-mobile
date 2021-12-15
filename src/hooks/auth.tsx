import React,
{
    useContext,
    createContext,
    ReactNode,
    useState,
    useEffect
} from 'react';

import * as Google from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IGoogleUser } from '../shared/interfaces/IGoogleUser';
import { IGoogleUserInfo } from '../shared/interfaces/IGoogleUserInfo';
import { IUser } from '../shared/interfaces/IUser';
import { GoogleAuthService } from '../shared/services/api/googleAuthService';

interface IAuthProvider{
    children: ReactNode;
}

interface IAuthContextData {
    googleUser: IGoogleUser;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoaging: boolean;
    token: string;
    user: IUser;
}

interface IAuthorizationResponse {
    params: {
        access_token: string;
    }
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider ({ children }: IAuthProvider) {
    
    const [user, setUser] = useState<IGoogleUser>({} as IGoogleUser);
    const [betUser, setBetUser] = useState<IUser>({} as IUser);
    const [token, setToken] = useState('');
    const [userStorageLoaging, setUserStorageLoaging] = useState(true);

    const userStorageKey = '@betcontrol:user';

    async function signInWithGoogle(){
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const REDIRECT_URL_PART = '&redirect_uri=' + process.env.REDIRECT_URI;
            const CLIENT_ID_PART = '&client_id='+ process.env.CLIENT_ID;
            const RESPONSE_TYPE_PART = '&response_type='+ RESPONSE_TYPE;
            const SCOPE_PART = '&scope=' + SCOPE;

            const authUrl =
                'https://accounts.google.com/o/oauth2/v2/auth?'
                + REDIRECT_URL_PART
                + CLIENT_ID_PART
                + RESPONSE_TYPE_PART
                + SCOPE_PART;
            const { type, params } = await Google.startAsync({ authUrl, showInRecents: false }) as IAuthorizationResponse;

            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json() as IGoogleUserInfo;

                const userLogged = {
                    id: userInfo.id,
                    email: userInfo.email,
                    locale: userInfo.locale,
                    name: userInfo.name,
                    photo: userInfo.picture
                }
                setUser(userLogged);

                const googleAuthService = new GoogleAuthService();
                const { user, token } = await googleAuthService.execute(userInfo);
                

                setToken(token);
                setBetUser(user);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
            }

        }catch(error: any){
            throw new Error(error);
        }
    }

    async function signInWithApple(){
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME
                ]
            });

            if(credential){
                const name = credential.fullName!.givenName!;
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    locale: '',
                    name,
                    photo: `https://ui-avatars.com/api/?name=${encodeURI(name)}`
                }
                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }

            
        }catch(error: any){
            throw new Error(error);
        }     
    }

    useEffect(()=> {
        async function loadUserStorrageDate(): Promise<void>{
            const userStoraged = await AsyncStorage.getItem(userStorageKey);

            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as IGoogleUser;
                setUser(userLogged);
            }

            setUserStorageLoaging(false);
        }
        loadUserStorrageDate();
    }, []);


    async function signOut(){
        setUser({} as IGoogleUser);
        await AsyncStorage.removeItem(userStorageKey);
    }

    return (
    <AuthContext.Provider
        value={
            {
                user: betUser,
                googleUser: user,
                signInWithGoogle,
                signInWithApple,
                signOut,
                userStorageLoaging,
                token,

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
