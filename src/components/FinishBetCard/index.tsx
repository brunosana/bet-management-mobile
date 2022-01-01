import React, { useCallback, useState } from 'react';
import { IOption } from '../../shared/interfaces/IOption';
import { getOption } from '../../shared/utils/getOption';

import {
    Card,
    CardText,
    Icon
} from './styles';

interface IFinishBetCard {
    team: string;
    option: IOption;
    odds: number;
    status: boolean;
    onPress(): void;
}

const FinishBetCard: React.FC<IFinishBetCard> = ({ onPress, team, option, odds, status = false }) => {
    

    const [activeStatus, setActiveStatus] = useState(status);
    function handleChangeStatus(){
        setActiveStatus(!activeStatus);
        onPress();
    };

    return(
        <Card
        onPress={handleChangeStatus}
        gain={activeStatus}
        >
            <Icon  name={ activeStatus ? 'check' : 'x' } />
            <CardText gain={activeStatus} >{team} - {odds} - {option.name}</CardText>
        </Card>
    );
}

export { FinishBetCard };