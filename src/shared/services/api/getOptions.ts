import { api } from './api';
import { IOption } from "../../interfaces/IOption";
import { AppError } from '../../Errors/AppError';

interface IOptionDB extends IOption {
    _id: string;
}

class GetOptions {
    public async execute(): Promise<Array<IOption>> {
    
        const response = await api.get('/options');

        if(response.status === 500){
            console.log(response);
            throw new Error('Erro ao capturar Apostas no banco de dados');
        }
        
        if(response.status !== 200){
            console.log(response);
            throw new AppError(response.data.message);
        }

        const betsWithoutId = response.data as Array<IOptionDB>;
        const bets: Array<IOption> = [];
        
        betsWithoutId.map(bet => {
            bets.push({
                ...bet,
                id: bet._id
            });
        });


        return bets;
    }
}

export { GetOptions }