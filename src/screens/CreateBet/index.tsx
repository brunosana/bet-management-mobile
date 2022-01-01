import React, { useState, useEffect } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    FormMiddle,
    Bets
} from './styles';

import { OptionSelectButton } from '../../components/Forms/OptionSelectButton';
import { Button } from '../../components/Forms/Button';
import { OptionSelect } from '../Modals/OptionSelect';
import { BetValueInput } from '../Modals/BetValueInput';
import { Loading } from '../Modals/Loading';
import { InputForm } from '../../components/Forms/InputForm';
import { IOption } from '../../shared/interfaces/IOption';
import { TeamRow } from '../../components/TeamRow';
import { ISingleBet } from '../../shared/interfaces/IBet';
import AppLoading from 'expo-app-loading';
import { useApi } from '../../hooks/api';

interface IFormData {
    team: string;
    odds: number;
}

const schema = Yup.object().shape({
    team: Yup.string().required('Necessário inserir o nome do time'),
    odds: Yup.number()
        .required('Necessário inserir Odds')
        .moreThan(1.0, 'A Odds precisa ter um valor válido (Maior que 1)')
        .typeError('Odds aceita apenas valores numéricos')
}).required();

interface ICreateBet {
    navigation: StackNavigationProp<ParamListBase, 'Create'>;
}

const CreateBet: React.FC<ICreateBet> = ({ navigation }) => {

    const [options, setOptions] = useState<Array<IOption>>([]);

    const [option, setOption] = useState<IOption>();
    const [bet_value, setBetValue] = useState(0);
    const [bets, setBets] = useState<Array<ISingleBet> | []>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);
    
    const [showOptionModal, setShowOptionModal] = useState(false);
    const [showBetValueInputModal, setShowBetValueInputModal] = useState(false);


    const { getOptions, options: apiOptions } = useApi();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        async function loadOptions(){
            setIsLoadingOptions(true);
            if(apiOptions.length > 0){
                setOptions(apiOptions);
            }else{
                const optionsDB = await getOptions();
                setOptions(optionsDB);
            }
            if(!option){
                setOption(options[0]);
            }
            setIsLoadingOptions(false);
        }
        loadOptions();
    }, [options]);

    useEffect(() => {
        if(bet_value > 0){
            navigation.navigate('Finish',
            {
                bet: {
                    bets,
                    bet_value,
                }
            });
        }
    }, [bet_value]);

    function handleCloseBetValueInput(){
        setShowBetValueInputModal(false);
    }

    function handleOpenBetValueInput(){
        setShowBetValueInputModal(true);
    }

    function handleCloseSelectCategory(){
        setShowOptionModal(false);
    }

    function handleOpenSelectOptionModal() {
        setShowOptionModal(true);
    }

    function handleRegister(form: IFormData){
        let { team, odds } = form;
        odds = parseFloat(odds.toString().replace(',', '.'));

        const data = {
            option,
            team,
            odds
        }

        const oldBets = bets;
        const newBet = {
            odds: data.odds,
            option: data.option,
            team: data.team
        } as ISingleBet;
        setBets([...oldBets, newBet]);
        reset();
    }

    function handleEditBet(id: number){
        let editBet = bets[id];
        bets.splice(id, 1);
        setBets([...bets]);
        setValue('team', editBet.team);
        setOption(editBet.option);
        setValue('odds', editBet.odds.toString());
    }

    return (

            <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            >
            <Container>
                <Header>
                    <Title>Cadastrar Aposta</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="team"
                            control={control}
                            autoCapitalize="words"
                            placeholder="Team"
                            error={errors.team && errors.team.message}
                            />
                        <FormMiddle>
                            { option ?
                                <OptionSelectButton
                                    title={ option.name }
                                    onPress={handleOpenSelectOptionModal}
                                    
                                />
                                :
                                <AppLoading />
                            }
                            <InputForm
                                width={48.5}
                                error={errors.odds && errors.odds.message}
                                name="odds"
                                control={control}
                                keyboardType="numeric"
                                placeholder="Odds"
                            />  
                        </FormMiddle>
                    <Button
                        title="Adicionar"
                        onPress={handleSubmit(handleRegister)}
                    />
                    </Fields>
                    {
                    bets &&
                    <Bets
                        showsVerticalScrollIndicator={false}
                    >
                        {
                        bets.map((bet, index) =>
                            <TeamRow
                                key={`${bet.team}-${bet.odds}-${bet._id}`}
                                onPress={() => handleEditBet(index)}
                                team={bet.team}
                                odds={bet.odds}
                                option={bet.option}
                            />
                        )
                        }
                    </Bets>
                    }
                    <Button
                        onPress={handleOpenBetValueInput}
                        title="Próximo"
                        />
                </Form>
                <Modal visible={showOptionModal} >
                    <OptionSelect
                        options={options}
                        setOption={setOption}
                        closeSelectCategory={handleCloseSelectCategory}
                        />
                </Modal>

                <Modal
                    visible={showBetValueInputModal}
                    transparent
                >
                    <BetValueInput
                        setBetValue={setBetValue}
                        closeModal={handleCloseBetValueInput}
                    />
                </Modal>
                {/* <Modal
                    visible={isLoadingOptions}
                >
                    <Loading />
                </Modal> */}
            </Container>
        </TouchableWithoutFeedback>
    );
}

export { CreateBet }