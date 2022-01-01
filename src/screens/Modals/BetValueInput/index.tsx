import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import {
    Container,
    Title,
    Content,
    Input,
    Form
} from './styles'
import { Button } from '../../../components/Forms/Button';
import { main } from '../../../global/styles/theme';

const schema = Yup.object().shape({
    betValue: Yup.number()
    .required('Quantidade deve ser válida')
    .min(0.1)
}).required();

interface IFormData {
    betValue: number;
}

interface IBetValueInput {
    closeModal: () => void;
    setBetValue: (value: number)=> void;
}

const BetValueInput: React.FC<IBetValueInput> = ({ closeModal, setBetValue }) =>{

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function handleCreateBet({ betValue }: IFormData) {
        let value = parseFloat(betValue.toString().replace(',', '.'));
        setBetValue(value);
        closeModal();
    }

    return (
        <Container>
            <Content>
                <Title>Insira o valor da aposta</Title>
                <Form>
                    <Input
                        name='betValue'
                        control={control}
                        error={errors.betValue && errors.betValue.message}
                        keyboardType="numeric"
                        placeholder="Valor da Aposta"
                        placeholderTextColor={main.colors.shape}
                        />
                    <Button
                        title="Finalizar"
                        onPress={handleSubmit(handleCreateBet)}
                    />
                </Form>
            </Content>
        </Container>
    );
}

export { BetValueInput }