import { AppError } from "../../Errors/AppError"
import { IBet } from "../../interfaces/IBet";
import { api } from "./api";

class GetBets {
    public async execute(token: string): Promise<Array<IBet>> {
        if(!token) {
            throw new AppError('Token necessário');
        }

        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }
       
        const response = await api.get('/bets', config);

        if(response.status !== 200){
            console.log(response);
            throw new Error('Erro ao capturar Apostas no banco de dados');
        }
        
        const bets = response.data as Array<IBet>;

        return bets;

    }
}

export { GetBets }