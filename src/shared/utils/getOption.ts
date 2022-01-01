import { useApi } from "../../hooks/api";
import { IOption } from "../interfaces/IOption";

const getOption = async (id: string): Promise<IOption> => {
    const { getOptions, options } = useApi();
    if(options.length <= 0){
        await getOptions();
    }

    const index = options.findIndex(op => op.id === id);
    return options[index];
}

export { getOption };