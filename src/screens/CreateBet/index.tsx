import React, { useState } from 'react';

import { Modal } from 'react-native';

import {
    Container,
    Header,
    Title,
    Form,
    Fields
} from './styles';

import { Input } from '../../components/Forms/Input';
import { OptionSelectButton } from '../../components/Forms/OptionSelectButton';
import { Button } from '../../components/Forms/Button';
import { OptionSelect, IOption } from '../OptionSelect';

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

    const [option, setOption] = useState<IOption>(options[0]);

    function handleCloseSelectCategory(){
        setShowOptionModal(false);
    }

    function handleOpenSelectOptionModal() {
        setShowOptionModal(true);
    }

    return (
        <Container>
            <Header>
                <Title>Cadastrar Aposta</Title>
            </Header>
            <Form>
                <Fields>
                    <Input
                        placeholder="Team"
                        />
                    <OptionSelectButton
                        title={option.name}
                        onPress={handleOpenSelectOptionModal}

                    />
                    <Input
                        keyboardType="decimal-pad"
                        placeholder="Odds"
                    />  
                </Fields>
                <Button
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
    );
}

export { CreateBet }