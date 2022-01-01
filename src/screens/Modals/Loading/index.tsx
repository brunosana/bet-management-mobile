import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import {
    Container,
    Title
} from './styles';

const Loading: React.FC = () => {

    const theme = useTheme();

    return (
        <Container>
            <ActivityIndicator
                color={theme.colors.shape}
                size={50}
            />
            <Title>
                Loading...
            </Title>
        </Container>
    );
}

export { Loading };