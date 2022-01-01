import { ICreateBet } from "../interfaces/IBet";

const getTotalBetValue = ({ bets, bet_value }: ICreateBet): string => {
    let finalOdds = 1;
    bets.map(b => finalOdds *= b.odds);
    let finalValue = (bet_value*finalOdds).toFixed(2).replace('.', ',')
    return finalValue;
}

export { getTotalBetValue };