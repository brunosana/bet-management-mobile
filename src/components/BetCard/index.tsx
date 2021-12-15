import React from 'react';
import { IBet } from '../../shared/interfaces/IBet';

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
    let finalOdds = 1;
    for (let i = 0; i < data.bets.length; i++) {
        finalOdds *= data.bets[i].odds;
    }
    let value = data.bet_value * finalOdds;
    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <Info>{ data.bets.length } Casadinhas</Info>
                    <Value gain={data.status}>R$
                        {`${!data.status ? ' -' : '  '}`}
                        {
                            data.status ? 
                            value.toFixed(2).toString().replace('.',',') 
                            : data.bet_value.toFixed(2).toString().replace('.',',')
                        }
                    </Value>
                </HeaderInfo>
                <HeaderIcon gain={data.status} name={`${data.status ? "arrowup" : "arrowdown"}`}/>
            </Header>
            <Footer>
                <FooterInfo>Odds: {finalOdds}</FooterInfo>
                <FooterInfo>{data.createdAt.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</FooterInfo>
            </Footer>
        </Container>
    );
}

export { BetCard, IBetCardData }