import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Button as ImportedButton } from '../../components/Forms/Button';
import { Bets as ImportedBets } from '../CreateBet/styles';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    height: ${RFValue(90)}px;
    align-items: center;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: flex-end;
    padding-bottom: ${RFValue(20)}px;
    `;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    `;

export const InfoArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const InfoText = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(18)}px;
    align-items: center;
    justify-content: center;
    margin-bottom: ${RFValue(12)}px;
    margin-top: -${RFValue(12)}px;
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    padding: 24px;
    justify-content:space-between;
`;

export const Footer = styled.View`
    padding: 0 24px;
    justify-content: space-between;
`;

export const Bets = styled(ImportedBets)`
    margin-bottom: 30px;
    padding: 24px;
`;
export const Button = styled(ImportedButton)`
    margin-bottom: ${RFValue(15)}px;
`;