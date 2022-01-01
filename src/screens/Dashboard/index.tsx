import React, { useState, useEffect, useCallback } from 'react';
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
import { IBet } from '../../shared/interfaces/IBet';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { useApi } from '../../hooks/api';
import { BetCard } from '../../components/BetCard';

const Dashboard: React.FC = () => {

    const [openedBets, setOpenedBets] = useState<Array<IBet>>();
    const [bets, setBets] = useState<Array<IBet>>();
    const theme = useTheme();
    const { getBets } = useApi();

    const { signOut, user, googleUser, token } = useAuth();

    async function loadBets() {
        const betsUser = await getBets({ token, max: 10, opened: false });
        setBets(betsUser);
    }
    async function loadOpenedBets() {
        const betsUser = await getBets({ token, opened: true });
        setOpenedBets(betsUser);
    }

    useEffect(()=> {
        loadOpenedBets();
        loadBets();
    }, []);

    const handleFinishBet = useCallback(() => {
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
            {
                (!openedBets || openedBets.length === 0) &&
                <Message>Não há Apostas Abertas</Message>
            }
            <ActiveBets>
            { openedBets &&
                openedBets.map(b =>
                    <OpenedBetCard
                        key={b._id}
                        id={b._id}
                        bet={b}
                        onFinishBet={handleFinishBet}
                    />
                )
            }
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