import React from 'react';
import { IBet } from '../../shared/interfaces/IBet';
import { getFormatedDate } from '../../shared/utils/getFormatedDate';
import { getTotalBetValue } from '../../shared/utils/getTotalBetValue';
import { getTotalOdds } from '../../shared/utils/getTotalOdds';

import {
    Container,
    Info,
    Value,
    Footer,
    FooterInfo,
    Header,
    HeaderInfo,
    HeaderIcon
} from './styles';

interface IBetCardData{
    gain: boolean;
    teams: number;
    value: number;
    odds: number;
    date:Date;
}

interface IBetInfo {
    data: IBet;
}

const BetCard: React.FC<IBetInfo> = ({ data }) => {

    let value = getTotalBetValue({ bets: data.bets, bet_value: data.bet_value });
    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <Info>{ data.bets.length } Casadinha{`${data.bets.length > 1 ? 's' : ''}`}</Info>
                    <Value gain={data.status}>R$
                        {`${!data.status ? ' -' : '  '}`}
                        {
                            data.status ? 
                            value
                            : data.bet_value.toFixed(2).toString().replace('.',',')
                        }
                    </Value>
                </HeaderInfo>
                <HeaderIcon gain={data.status} name={`${data.status ? "arrowup" : "arrowdown"}`}/>
            </Header>
            <Footer>
                <FooterInfo>Odds: {getTotalOdds(data.bets).toFixed(2).toString().replace('.',',')}</FooterInfo>
                <FooterInfo>{getFormatedDate(data.updatedAt)}</FooterInfo>
            </Footer>
        </Container>
    );
}

export { BetCard, IBetCardData }