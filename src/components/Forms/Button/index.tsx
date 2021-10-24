import React from 'react';

import { TouchableOpacityProps } from 'react-native';

import {
    Container,
    Title
} from './styled';

interface IButton extends TouchableOpacityProps {
    title: string;
}

const Button: React.FC<IButton> = ({title, ...rest}) => {
    return (
        <Container {...rest}>
            <Title>{ title }</Title>
        </Container>
    );
}

export { Button }