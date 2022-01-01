import { AppError } from "../../Errors/AppError";
import { IBet, IRequestCreateBet } from "../../interfaces/IBet";
import { api } from "./api";

interface ICreateBetAPI {
    option: string;
    team: string;
    odds: number;
}

class CreateBet {
    public async execute({ bet, token }: IRequestCreateBet): Promise<IBet> {
        
        const { bets, bet_value } = bet;

        console.log(bets);

        if(!bets || bets.length <=0){
            throw new AppError('Você precisa de pelo menos uma aposta');
        }
        if(!bet_value || bet_value <=0) {
            throw new AppError('Você precisa apostar um valor válido');
        }

        const config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        let newBets = [] as Array<ICreateBetAPI>;

        bets.map(b => {
            newBets.push({
                odds: b.odds,
                option: b.option.id,
                team: b.team
            });
        })

        const data = {
            bets: newBets,
            bet_value
        }

        const response = await api.post('/bets', data, config);

        if(response.status === 500){
            console.log(response);
            throw new Error('Erro ao capturar Apostas no banco de dados');
        }
        
        if(response.status !== 200){
            console.log(response);
            throw new AppError(response.data.message);
        }

        const createdBet = response.data as IBet;

        return createdBet;
    }
}

export { CreateBet }