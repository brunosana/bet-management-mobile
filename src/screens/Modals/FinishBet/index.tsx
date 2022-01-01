import React, { useCallback, useEffect, useState } from 'react';
import { Modal, ToastAndroid } from 'react-native';
import { FinishBetCard } from '../../../components/FinishBetCard';
import { useApi } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';
import { IBet, ISingleBet } from '../../../shared/interfaces/IBet';
import { Loading } from '../Loading';

import {
    Container,
    BetsArea,
    ButtonArea,
    Button
} from './styles';

interface IFinishBet {
    bet: IBet;
    id: string;
    closeModal(): void;
    closeWithoutSalve(): void;
}

const FinishBet: React.FC<IFinishBet> = ({ bet, id, closeModal, closeWithoutSalve }) => {

    const [finishBets, setFinishBet] = useState<Array<ISingleBet>>(bet.bets);
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);
    const { finishBet } = useApi();
    const { token } = useAuth();


    useEffect(()=> {
        let newBets = finishBets;
        newBets.map(b => {
            if(b.gain === undefined){
                b.gain = false;
            }
        });
        setFinishBet(newBets);
    }, [finishBets]);

    const handleChangeBetGain = useCallback((id: string) => {
        const index = finishBets.findIndex(b => b._id === id);
        let newBets = finishBets;
        newBets[index].gain = !newBets[index].gain;
        setFinishBet(newBets);
    }, []);

    const handleFinishBet = useCallback(async () => {
        try{
            setIsLoadingOptions(true);
            await finishBet({
                bets: finishBets,
                id,
                token
            });
            setIsLoadingOptions(false);
            ToastAndroid.show('Aposta Finalizada...', ToastAndroid.SHORT);
            closeModal();
        }catch(error: any){
            setIsLoadingOptions(false);
            alert(error.message);
        }
        setIsLoadingOptions(false);
    }, []);

    const handleCancel = useCallback(() => {
        closeWithoutSalve();
    }, []);

    return (
        <Container>
            {
                finishBets &&
                <BetsArea
                    data={finishBets}
                    keyExtractor={item => item._id.toString()}
                    renderItem={({item: b}) =>
                        <FinishBetCard
                            team={b.team}
                            status={b.gain ? true : false}
                            odds={b.odds}
                            option={b.option}
                            key={b._id}
                            onPress={() => {
                                handleChangeBetGain(b._id)
                            }}
                        />
                    }
                />
            }
            <ButtonArea>
                <Button
                    title='Finalizar'
                    onPress={handleFinishBet}
                />
                <Button
                    title='Cancelar'
                    onPress={handleCancel}
                />
            </ButtonArea>
            <Modal
                    visible={isLoadingOptions}
                    transparent
                >
                    <Loading />
            </Modal>
        </Container>
    );
}

export { FinishBet }