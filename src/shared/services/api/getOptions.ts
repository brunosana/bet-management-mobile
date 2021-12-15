import { api } from './api';
import { IOption } from "../../interfaces/IOption";
import { AppError } from '../../Errors/AppError';

interface IOptionDB extends IOption {
    _id: string;
}

class GetOptions {
    public async execute(): Promise<Array<IOption>> {
    
        const response = await api.get('/options');

        if(response.status !== 200){
            console.log(response);
            throw new AppError('Erro ao capturar opções no banco');
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