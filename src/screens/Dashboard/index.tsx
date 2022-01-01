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
    Message,
    BetHeader,
    RefreshButton,
    RefreshIcon
} from './styles';

import { useAuth } from '../../hooks/auth';

import { OpenedBetCard } from '../../components/OpenedBetCard';
import { IBet } from '../../shared/interfaces/IBet';
import { ActivityIndicator, Modal, ToastAndroid } from 'react-native';
import { useTheme } from 'styled-components';
import { useApi } from '../../hooks/api';
import { BetCard } from '../../components/BetCard';
import { Loading } from '../Modals/Loading';

const Dashboard: React.FC = () => {

    const [openedBets, setOpenedBets] = useState<Array<IBet>>();
    const [bets, setBets] = useState<Array<IBet>>();
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);
    const [dataInProgress, setDataInProgress] = useState(false);

    const theme = useTheme();
    const { getBets } = useApi();

    const { signOut, user, googleUser, token } = useAuth();

    async function loadBets() {
        setDataInProgress(true);
        const betsUser = await getBets({ token, max: 10, opened: false });
        setBets(betsUser);
        setDataInProgress(false);
    }
    async function loadOpenedBets() {
        setDataInProgress(true);
        const betsUser = await getBets({ token, opened: true });
        setOpenedBets(betsUser);
        setDataInProgress(false);
    }

    useEffect(()=> {
        async function execute(){
            loadOpenedBets();
            loadBets();
        }
        execute();
    }, []);
    
    const handleUpdate = useCallback(async () => {
        setIsLoadingOptions(true);
        await loadBets();
        await loadOpenedBets();
        setIsLoadingOptions(false);
        ToastAndroid.show('Dados atualizados', ToastAndroid.SHORT);
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
                ((!openedBets || openedBets.length === 0) && !dataInProgress) &&
                <Message>Não há Apostas Abertas</Message>
            }
            {
                ((!openedBets || openedBets.length === 0) && dataInProgress) &&
                <Message>Carregando</Message>
            }
            <ActiveBets>
            { openedBets &&
                openedBets.map(b =>
                    <OpenedBetCard
                    key={b._id}
                    id={b._id}
                    bet={b}
                    onFinishBet={() => {}}
                    />
                    )
                }
            </ActiveBets>

            <Bets>
                <BetHeader>
                    <BetTitle>Histórico</BetTitle>
                    <RefreshButton
                        onPress={handleUpdate}
                    >
                        <RefreshIcon name="refresh-outline"/>
                    </RefreshButton>
                </BetHeader>
                {
                    ((!bets || bets.length === 0) && !dataInProgress) &&
                    <Message>Não há histórico de Apostas</Message>
                }
                {
                    ((!bets || bets.length === 0) && dataInProgress) &&
                    <Message>Carregando</Message>
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
        <Modal
            visible={isLoadingOptions}
            transparent
        >
            <Loading />
        </Modal>
        </>
    );
};

export { Dashboard }