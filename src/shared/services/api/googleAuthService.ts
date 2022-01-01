import { AppError } from '../../Errors/AppError';
import { IGoogleUserInfo } from '../../interfaces/IGoogleUserInfo';
import { IUser } from '../../interfaces/IUser';
import { api } from './api';

interface IAuthSuccess {
    user: IUser;
    token: string;
}

class GoogleAuthService {
    public async execute({ id, email, name }: IGoogleUserInfo): Promise<IAuthSuccess> {
        if(!id) {
            throw new AppError('Missing Google Id');
        }

        if(!email) {
            throw new AppError('Missing Email Property');
        }

        if(!name) {
            throw new AppError('Missing Name Property');
        }
        const response = await api.post('/users/googleauth', {
            email,
            name,
            id
        });

        if(response.status === 500){
            console.log(response);
            throw new Error('Erro ao capturar Apostas no banco de dados');
        }
        
        if(response.status !== 200){
            console.log(response);
            throw new AppError(response.data.message);
        }

        const { user, token } = response.data as IAuthSuccess;
        return { user, token };
    }
}

export { GoogleAuthService }