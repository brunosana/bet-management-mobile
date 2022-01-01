import { ISingleBet } from "../interfaces/IBet";

const getTotalOdds = (bets: Array<ISingleBet>): number => {
    let finalOdds = 1;
    bets.map(b => finalOdds *= b.odds);
    return finalOdds;
}

export { getTotalOdds };