import React, { useState, useEffect } from 'react';
import { 
    Container,
    Header,
    UserInfo,
    UserArea,
    UserName,
    UserPhoto,
    UserBets,
    UserWrapper,
    Icon,
    ActiveBets,
    Bets,
    BetTitle,
    BetsList,
    LogoutButton,
    Message
} from './styles';

import { useAuth } from '../../hooks/auth';

import { OpenedBetCard } from '../../components/OpenedBetCard';
import { BetCard, IBetCardData } from '../../components/BetCard';
import { GetBets } from '../../shared/services/api/getBets';
import { IBet } from '../../shared/interfaces/IBet';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

const Dashboard: React.FC = () => {

    const [bets, setBets] = useState<Array<IBet>>();
    const theme = useTheme();

    const { signOut, user, googleUser, token } = useAuth();

    useEffect(()=> {
        async function loadBets() {
            const getBets = new GetBets();
            const betsUser = await getBets.execute(token);
            setBets(betsUser);
        }
        loadBets();
    }, []);

    return (
        <>
        {
            token ?
            <Container>
            <Header>
                <UserWrapper>
                    <UserArea>
                        <UserPhoto source={{ uri:  googleUser.photo }} />
                        <UserInfo>
                            <UserName>{user.name}</UserName>
                            <UserBets>{user.bets > 0 ?
                                `${user.bets} Aposta${user.bets > 1 ? 's' : ''}`
                                : 'Nenhuma aposta'}
                            </UserBets>
                        </UserInfo>
                    </UserArea>
                    <LogoutButton
                        onPress={signOut}
                    >
                        <Icon name="md-exit-outline"/>
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <ActiveBets>
                <OpenedBetCard teams={8} odds={1.11} value={30.00} return_value={150.65} />
                <OpenedBetCard teams={2} odds={1.6} value={45.00} return_value={215.00} />
                <OpenedBetCard teams={3} odds={2.4} value={180.00} return_value={550.65} />
                <OpenedBetCard teams={8} odds={1.11} value={30.00} return_value={150.65} />
            </ActiveBets>
            <Bets>
                <BetTitle>Histórico</BetTitle>
                {
                    (!bets || bets.length === 0) &&
                    <Message>Não há histórico de Apostas</Message>
                }
                { bets && <BetsList
                    data={bets}
                    keyExtractor={item => item._id.toString()}
                    renderItem={({item}) => <BetCard data={item} />}
                />}

            </Bets>
        </Container>

        :

        <ActivityIndicator
        color={theme.colors.shape}
        style={{
            margin: 18
        }}
        />
        }
        </>
    );
};

export { Dashboard }