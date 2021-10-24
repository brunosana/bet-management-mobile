import React from 'react';

import {
    Container,
    Title,
    Icon
} from './styles';

import { TouchableOpacityProps } from 'react-native';

interface IOption extends TouchableOpacityProps{
    title: string;
}

const OptionSelectButton: React.FC<IOption> = ({ title, ...rest }) => {
    return (
        <Container
            activeOpacity={0.7}
            {...rest}
        >
            <Title>
                {title}
            </Title>
            <Icon name="chevron-down"/>
        </Container>
    );
}

export { OptionSelectButton };