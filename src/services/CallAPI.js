import axios from 'axios';


export default function CallAPI(endpoint, method='GET',body,token){
    return  axios({
        method: method,
        url: `${endpoint}`,
        data: body,
        headers: {Authorization:`Bearer ${token}`}
        
      }).catch(err=>{
        console.log(err)
      });

};