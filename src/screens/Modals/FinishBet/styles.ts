import { FlatList } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components/native";
import { ISingleBet } from "../../../shared/interfaces/IBet";
import { Button as BTN } from '../../../components/Forms/Button';
import { RFValue } from "react-native-responsive-fontsize";


export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_hard_highlight};
    padding: 24px 24px;
`;

export const BetsArea = styled(
    FlatList as new () => FlatList<ISingleBet>
    ).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace(),
    }
})``;

export const ButtonArea = styled.View`
    padding: 5px 0;
    justify-content: space-between;

`;

export const Button = styled(BTN)`
    margin-bottom: ${RFValue(8)}px;
`;