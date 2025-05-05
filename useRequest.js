import { getMessage } from "../services/MessageService";

const useRequest = () => {
    const makeRequest = (
        action, 
        method, 
        body,
        onSuccess, 
        onFailure
    ) => {
        let headers = {
            "Content-Type": "application/json",
            "X-Forwarded-Proto": "https",
            "X-Forwarded-Port": 443,
        };

        let config = {
            method: method
        };
        
        if(body){
            config = {...config, ...{body: JSON.stringify(body)}};
            config = {...config, ...{headers: headers}};
        };

        fetch(action, config)
            .then(res => res.json())
            .then(resJson => {
                if(resJson.error){
                    resJson.errorDescription = !resJson.errorDescription ? getMessage('error.general') : resJson.errorDescription;
                    onFailure?.(resJson);
                    return;
                }
                onSuccess?.(resJson);
            }).catch(() => {
                onFailure?.({
                    error: 'CANT_CONNECT_TO_API',
                    errorCode: 0,
                    errorDescription: getMessage('error.general'),
                });
            });
    };

    return [makeRequest];
};

export default useRequest;