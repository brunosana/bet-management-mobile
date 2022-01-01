import React, { useState, useEffect } from 'react';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    ToastAndroid,
    Platform,
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Bets,
    Footer,
    Button,
    InfoArea,
    InfoText
} from './styles';



import { TeamRow } from '../../components/TeamRow';
import { ICreateBet, ISingleBet } from '../../shared/interfaces/IBet';
import { useAuth } from '../../hooks/auth';
import { Loading } from '../Modals/Loading';
import { useApi } from '../../hooks/api';

interface IRequest extends ParamListBase {
    bet: ICreateBet;
}

interface IFinishBet {
    navigation: StackNavigationProp<IRequest, 'Finish'>;
    route: RouteProp<IRequest, 'Finish'>;
}

const FinishBet: React.FC<IFinishBet> = ({ navigation, route }) => {

    const { params: { bet } } = route as { params: IRequest };
    const [returnValue, setReturnValue] = useState(0);
    const { token } = useAuth();
    const [bets, setBets] = useState<Array<ISingleBet> | []>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);
    
    const { createBet } = useApi();

    async function handleCreateBet(){
        setIsLoadingOptions(true);
        try{
            await createBet({
                bet,
                token
            });
            setIsLoadingOptions(false);
            if(Platform.OS === 'android'){
                ToastAndroid.show('Aposta Criada', ToastAndroid.SHORT);
            }else{
                alert('Aposta Criada');
            }
            navigation.push('Create');
        }catch(error: any){
            alert(error.message);
            setIsLoadingOptions(false);
        }
    }
    function handleCancelBet(){
        navigation.goBack();
    }

    useEffect(() => {
        setBets(bet.bets);

        let finalValue = 1;
        if(bet){
            bet.bets.map(b => {
                finalValue *= b.odds;
            });
        }
        setReturnValue(finalValue*bet.bet_value);
    });

    return (

            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
            <Container>
                <Header>
                    <Title>Finalizar Aposta</Title>
                </Header>
                    {
                        bets &&
                        <Bets
                            showsVerticalScrollIndicator={false}
                        >
                            {
                            bets.map((bet, index) =>
                                <TeamRow
                                    key={`${index}-${bet.team}-${bet.odds}-${bet._id}`}
                                    onPress={() => {}}
                                    team={bet.team}
                                    odds={bet.odds}
                                    option={bet.option}
                                />
                            )
                            }
                        </Bets>
                    }
                <Footer>
                    <InfoArea>
                        <InfoText>
                            Valor: R$ {bet.bet_value.toFixed(2).replace('.', ',')}
                        </InfoText>
                        <InfoText>Retorno: R$ {returnValue.toFixed(2).replace('.', ',')}</InfoText>
                    </InfoArea>
                    <Button
                        title="Cadastrar"
                        onPress={handleCreateBet}
                    />
                    <Button
                        title="Cancelar"
                        onPress={handleCancelBet}
                    />
                </Footer>

                <Modal
                    visible={isLoadingOptions}
                    transparent
                >
                    <Loading />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}

export { FinishBet }