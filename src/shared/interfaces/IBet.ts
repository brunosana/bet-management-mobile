import { IOption } from "./IOption";

export interface IBet {
    _id: string;
    bets: [ISingleBet]
    finished: boolean;
    user: string;
    createdAt: Date;
    updatedAt: Date;
    bet_value: number;
    status: boolean;
}

export interface ISingleBet {
    _id: string;
    team: string;
    odds: number;
    option: IOption;
}
