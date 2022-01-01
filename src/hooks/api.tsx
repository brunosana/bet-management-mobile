import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import { IBet, IRequestCreateBet, IRequestFinishBet, IRequestGetBets } from '../shared/interfaces/IBet';
import { IOption } from '../shared/interfaces/IOption';
import { CreateBet } from '../shared/services/api/createBet';
import { FinishBet } from '../shared/services/api/finishBet';
import { GetBets } from '../shared/services/api/getBets';
import { GetOptions } from '../shared/services/api/getOptions';

interface IApiContext {
    createBet(request: IRequestCreateBet): Promise<IBet>;
    getBets(data: IRequestGetBets): Promise<Array<IBet>>;
    getOptions(): Promise<Array<IOption>>;
    finishBet(data: IRequestFinishBet): Promise<IBet>;
    options: Array<IOption>;
}

interface IApiProvider {
    children: ReactNode;
}

const ApiContext = createContext({} as IApiContext);

const ApiProvider: React.FC<IApiProvider> = ({ children }) => {

    const [options, setOptions] = useState<Array<IOption>>([]);

    const createBet = useCallback(async ({ bet, token }: IRequestCreateBet) => {
        const create = new CreateBet();
        try{
            const response = await create.execute({ bet, token });
            return response;
        }catch(err: any){
            throw new Error(err.message);
        }

    }, []);

    const getBets = useCallback(async ({ token, max, opened }: IRequestGetBets) => {
        const get = new GetBets();
        try{
            const response = await get.execute({ token, max, opened });
            return response;
        }catch(err: any){
            throw new Error(err.message);
        }
    }, []);
    
    const getOptions = useCallback(async () => {
        try {
            if(options && options.length > 0)
            return options;
            const get = new GetOptions();
            const response = await get.execute();
            setOptions(response);
            return response;
        }catch(err: any) {
            throw new Error(err.message);
        }
    }, []);
    

    const finishBet = useCallback(async ({ bets, id, token }: IRequestFinishBet) => {
        const finish = new FinishBet();
        try{
            const response = await finish.execute({ bets, id, token});
            return response;
        }catch(err: any){
            throw new Error(err.message);
        }
    }, []);

    return(
        <ApiContext.Provider
            value={{
                createBet,
                getBets,
                getOptions,
                finishBet,
                options
            }}
        >
            {children}
        </ApiContext.Provider>
    );
}

function useApi(){
    const context = useContext(ApiContext);
    return context;
}

export { useApi, ApiProvider };