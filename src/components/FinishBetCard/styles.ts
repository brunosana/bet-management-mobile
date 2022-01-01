import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Button } from "../Forms/Button";
import { TouchableOpacity } from "react-native";

interface ICheck {
    gain: boolean;
}

export const Card = styled(TouchableOpacity)<ICheck>`
    width: 100%;
    ${({ gain }) => gain ? 
        css`background-color: ${({ theme }) => theme.colors.success};`
        :
        css`background-color: ${({ theme }) => theme.colors.attention};`
    }
    border-radius: ${({ theme }) => theme.patterns.radiusCard}px;
    margin-top: ${RFValue(5)}px;
    flex-direction: row;
    align-items: center;
    height: ${RFValue(45)}px;
    padding: 18px;
`;

export const CardText = styled.Text<ICheck>`
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.shape};
`;

export const Icon = styled(Feather)<ICheck>`
    color: ${({ theme }) => theme.colors.shape};
    border-radius: ${({ theme }) => theme.patterns.radiusCard}px;
    margin-left: ${RFValue(15)}px;
    font-size: ${RFValue(21)}px;
    font-weight: bold;
`;