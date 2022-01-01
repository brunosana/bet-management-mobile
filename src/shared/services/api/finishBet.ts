import { AppError } from "../../Errors/AppError";
import { IBet, IRequestFinishBet, ISingleBet, ISingleBetApi } from "../../interfaces/IBet";
import { api } from "./api";

interface ISingleBetApiFinish extends ISingleBetApi {
    id: string;
}

class FinishBet {
    public async execute({ bets, id, token }: IRequestFinishBet): Promise<IBet> {
        if(bets.length <= 0) {
            throw new AppError('Apostas incorretas');
        }
        
        if(!id){
            throw new AppError('ID inválido');
        }

        if(!token){
            throw new AppError('Token inválido');
        }

        let arrayToSend: Array<ISingleBetApiFinish> = [];

        bets.forEach(b => {
            if(b.gain === undefined){
                throw new AppError('Necessário preencher o ganho de todas as casadinhas');
            }
            arrayToSend.push({
                _id: b._id,
                id: b._id,
                odds: b.odds,
                option: b.option.id,
                team: b.team,
                gain: b.gain
            })
        });

        const config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        const data = {
            bets: arrayToSend,
        };

        const response = await api.put(`/bets/${id}/finish`, data, config);
        
        if(response.status === 500){
            console.log(response);
            throw new Error('Erro ao capturar Apostas no banco de dados');
        }
        
        if(response.status !== 200){
            console.log(response);
            throw new AppError(response.data.message);
        }

        const apiReturn = response.data as IBet;

        return apiReturn;        

    }
}

export { FinishBet };