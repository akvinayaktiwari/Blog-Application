import axios from 'axios';

import { API_NOTIFICATION_MESSEGE ,SERVICE_URL} from '../constants/config';
import { getAccessToken,getType } from '../utils/common-utils';

const API_URL= 'http://localhost:8000';

const axiosInstance=axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "content-type":"application/json"
    }

})

axiosInstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){  // adding these line to handle params or you can say adding categories features
            config.params=config.TYPE.params;
        }
        else if(config.TYPE.query){
            config.url=config.url + '/' + config.TYPE.query;

        }
        return config
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        //stop global loader here.
        return processResponse(response);
    },
    function(error){
        // stop global loader here.
        return Promise.reject(processError(error))
    }
)

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess : true, data: response.data }
    } else {
        return { 
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}



// error ke andar teen cheej aati h
const processError=(error)=>{
    if(error.response){
        //if request is sucessfull and server response is other than 2.x.x
        console.log('ERROR IN RESPONSE: ',error.toJSON())
        return{
            isError:true,
            msg: API_NOTIFICATION_MESSEGE.reponseFailure,
            code:error.response.status

        }

    }
    else if(error.request){
        //request is made but response was not recieved 
        console.log('ERROR IN REQUEST: ',error.toJSON())
        return{
            isError:true,
            msg: API_NOTIFICATION_MESSEGE.requestFailure,
            code:""

        }

    }
    else{
        //some thing happend from frontent side
        console.log('ERROR IN NETWOEK: ',error.toJSON())
        return{
            isError:true,
            msg: API_NOTIFICATION_MESSEGE.networkError,
            code:""

        }

    }
}

const API={};
for(const [key,value] of Object.entries(SERVICE_URL)){
    API[key]=(body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType:value.responseType,
            headers:{
                authorization: getAccessToken()
            },
            TYPE: getType(value,body),
            onUploadProcess: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProcess: function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted=Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })

    }

export {API}