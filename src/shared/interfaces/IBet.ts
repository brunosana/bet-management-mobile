import { IOption } from "./IOption";

export interface IBet {
    _id: string;
    bets: Array<ISingleBet>;
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
    gain?: boolean;
}

export interface ICreateBet{
    bets: Array<ISingleBet>;
    bet_value: number;
}

export interface IRequestCreateBet {
    bet: ICreateBet;
    token: string;
}

export interface IBetApi {
    _id: string;
    bets: [ISingleBetApi]
    finished: boolean;
    user: string;
    createdAt: Date;
    updatedAt: Date;
    bet_value: number;
    status: boolean;
}

export interface ISingleBetApi {
    _id: string;
    team: string;
    odds: number;
    option: string;
    gain?: boolean;
}

export interface IRequestFinishBet {
    bets: Array<ISingleBet>;
    id: string;
    token: string;
}

export interface IRequestGetBets {
    token: string;
    max?: number;
    opened?: boolean;
}