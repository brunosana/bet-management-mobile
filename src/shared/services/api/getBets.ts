import { useApi } from "../../../hooks/api";
import { AppError } from "../../Errors/AppError"
import { IBet, IBetApi, IRequestGetBets, ISingleBet } from "../../interfaces/IBet";
import { api } from "./api";
import { GetOptions } from "./getOptions";

interface IParams {
   opened: undefined | string; 
   max: undefined | number; 
}

class GetBets {
    public async execute({token, max, opened }: IRequestGetBets): Promise<Array<IBet>> {
        if(!token) {
            throw new AppError('Token necessário');
        }

        
        let params = {
            opened: undefined,
            max: undefined
        } as IParams;
        
        if(opened === true){
            params.opened = 'false';
        }
        else if(opened === false){
            params.opened = 'true';
        }
        
        if(max){
            params.max = max;
        }
        
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            },
            params,
        }
        const response = await api.get('/bets', config);

        if(response.status === 500){
            console.log(response);
            throw new Error('Erro ao capturar Apostas no banco de dados');
        }
        
        if(response.status !== 200){
            console.log(response);
            throw new AppError(response.data.message);
        }


        const returnBets: Array<IBet> = [];
        const data = response.data as Array<IBetApi>;
        const getOptions = new GetOptions();
        const options = await getOptions.execute();
        function getOption(id: string) {
            const optionIndex = options.findIndex(op => op.id === id);
            return options[optionIndex];
        }

        data.map(async nb => {
            const oldBets = nb.bets;
            let newBets: Array<ISingleBet> = [];
            oldBets.map( async (b) => {
                newBets.push({
                    _id: b._id,
                    odds: b.odds,
                    option: getOption(b.option),
                    team: b.team,
                    gain: b.gain
                });
            });
            returnBets.push({
                _id: nb._id,
                bet_value: nb.bet_value,
                bets: newBets,
                createdAt: nb.createdAt,
                finished: nb.finished,
                status: nb.status,
                updatedAt: nb.updatedAt,
                user: nb.user
            });
        })
        




        // return response.data as Array<IBet>;
        return returnBets;

    }
}

export { GetBets }