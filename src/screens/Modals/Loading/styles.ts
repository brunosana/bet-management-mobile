import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: column;
    height: ${RFPercentage(100)}px;
    background-color: ${({ theme }) => theme.colors.background_highlight};
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
`;