import React, { useState } from 'react';

import { 
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import {
    Container,
    Header,
    Title,
    Form,
    Fields
} from './styles';

import { OptionSelectButton } from '../../components/Forms/OptionSelectButton';
import { Button } from '../../components/Forms/Button';
import { OptionSelect, IOption } from '../OptionSelect';
import { InputForm } from '../../components/Forms/InputForm';

interface IFormData {
    team: string;
    odds: number;
}

const schema = Yup.object().shape({
    team: Yup.string().required('Necessário preencher um time'),
    odds: Yup.number().
        moreThan(1.0, 'A Odds precisa ter um valor válido (Maior que 1)')
        .typeError('Odds aceita apenas valores numéricos')
}).required();

const CreateBet: React.FC = () => {
    const [showOptionModal, setShowOptionModal] = useState(false);

    const [options, setOptions] = useState<Array<IOption>>([
        {
            id: '1',
            name: '+1,5'
        },
        {
            id: '2',
            name: '+2,5'
        },
        {
            id: '3',
            name: '+3,5'
        },
        {
            id: '4',
            name: '+4,5'
        },
    ]);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [option, setOption] = useState<IOption>(options[0]);

    function handleCloseSelectCategory(){
        setShowOptionModal(false);
    }

    function handleOpenSelectOptionModal() {
        setShowOptionModal(true);
    }

    function handleRegister(form: IFormData){
        let { team, odds } = form;
        odds = parseFloat(odds.toString().replace(',', '.'));
        if(!team){
            return Alert.alert("O time precisa ser inserido.");
        }

        if(!odds || odds<=1 ){
            return Alert.alert("O valor da Odds precisa ser válido.");
        }

        const data = {
            option,
            team,
            odds
        }
        console.log(data);
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
                        <OptionSelectButton
                            title={option.name}
                            onPress={handleOpenSelectOptionModal}
                            
                            />
                        <InputForm
                            error={errors.odds && errors.odds.message}
                            name="odds"
                            control={control}
                            keyboardType="numeric"
                            placeholder="Odds"
                            />  
                    </Fields>
                    <Button
                        onPress={handleSubmit(handleRegister)}
                        title="Adicionar"
                        />
                </Form>
                <Modal visible={showOptionModal} >
                    <OptionSelect
                        options={options}
                        setOption={setOption}
                        closeSelectCategory={handleCloseSelectCategory}
                        />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}

export { CreateBet }