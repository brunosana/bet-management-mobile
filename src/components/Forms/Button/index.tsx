import React from 'react';

import { TouchableOpacityProps } from 'react-native';
import { RectButtonProps, TouchableOpacity } from 'react-native-gesture-handler';

import {
    Container,
    Title
} from './styled';

interface IButton extends TouchableOpacity {
    title: string;
}

const Button: React.FC<IButton> = ({title, ...rest}) => {
    return (
        <Container
        {...rest}
        >
            <Title>{ title }</Title>
        </Container>
    );
}

export { Button }