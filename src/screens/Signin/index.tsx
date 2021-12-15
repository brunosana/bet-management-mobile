import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    FooterWrapper,
    Footer
} from './styles';

import AppleSvg from '../../shared/assets/apple.svg';
import GoogleSvg from '../../shared/assets/google.svg';
import Logo from '../../shared/assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

const SignIn: React.FC = () => {

    const { signInWithGoogle, signInWithApple } = useAuth();
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSignInWithGoogle(){
        try {
            setIsLoading(true);
            await signInWithGoogle();
        }catch(error){
            console.log(error);
            Alert.alert('Erro ao logar com Google');
            setIsLoading(false);
        }
    }

    async function handleSignInWithApple(){
        try {
            setIsLoading(true);
            await signInWithApple();
        }catch(error){
            console.log(error);
            Alert.alert('Erro ao logar com Apple');
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <Logo
                        width={RFValue(130)}
                        height={RFValue(130)}
                    />
                    <Title>
                        Gerencie e observe as suas apostas
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça o seu login
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    {
                        Platform.OS === 'ios' &&
                        <SignInSocialButton
                            title="Entrar com Apple"
                            svg={AppleSvg}
                            onPress={handleSignInWithApple}
                        />
                    }
                    { isLoading &&
                        <ActivityIndicator
                            color={theme.colors.shape}
                            style={{
                                margin: 18
                            }}
                        />
                    }
                </FooterWrapper>
            </Footer>
        </Container>        
    );
}

export { SignIn };

