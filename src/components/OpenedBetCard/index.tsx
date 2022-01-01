import React, { useCallback, useState } from 'react';
import { Modal } from 'react-native';
import { FinishBet } from '../../screens/Modals/FinishBet';
import { IBet } from '../../shared/interfaces/IBet';
import { getTotalBetValue } from '../../shared/utils/getTotalBetValue';
import { getTotalOdds } from '../../shared/utils/getTotalOdds';

import {
    Container,
    NestedBets,
    Icon,
    Header,
    Info,
    CardInfo,
    Card,
    CardTitle,
    BetInfo
} from './styles';

interface IOpenedBetProps {
    bet: IBet;
    id: string;
    onFinishBet(): void;
}

const OpenedBetCard: React.FC<IOpenedBetProps> = ({ bet, id, onFinishBet }) => {
    
    const { bets, bet_value, _id } = bet;
    const [finishBet, setFinishBet] = useState(false);
    const totalOdds = getTotalOdds(bets);

    const handleFinishBet = useCallback(() => {
        setFinishBet(true);
    }, []);

    const handleCloseWithoutSave = useCallback(() => {
        setFinishBet(false);
    }, []);
    
    const handleCloseModal = useCallback(() => {
        setFinishBet(false);
        onFinishBet();
    }, []);

    return (
        <Container
            odds={totalOdds}
            activeOpacity={0.8}
            onPress={handleFinishBet}
        >
            <Header>
                <NestedBets>{bets.length} Times</NestedBets>
                <Icon name="attach-money" odds={totalOdds} />
            </Header>
            <Info>
                <Card>
                    <CardTitle>
                        Odds
                    </CardTitle>
                    <CardInfo>
                        {totalOdds.toFixed(2).replace('.', ',')}
                    </CardInfo>
                </Card>
                <Card>
                    <CardTitle>
                        Valor
                    </CardTitle>
                    <CardInfo>
                        R$ {bet_value}
                    </CardInfo>
                </Card>
            </Info>
            <Info>
                <Card>
                    <CardTitle>
                        Possível retorno
                    </CardTitle>
                    <BetInfo>
                        R$ {getTotalBetValue({ bets, bet_value})}
                    </BetInfo>
                </Card>
            </Info>
            <Modal
                visible={finishBet}
                transparent
            >
                <FinishBet
                    bet={bet}
                    id={id}
                    closeModal={handleCloseModal}
                    closeWithoutSalve={handleCloseWithoutSave}
                />
            </Modal>
        </Container>
    );
}

export { OpenedBetCard };