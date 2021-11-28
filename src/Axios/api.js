import axios from 'axios'
export function apicalls(method,url,data)
{
    const SERVERURL="http://localhost:8080"
    return new Promise((resolve,reject)=>{
    axios({
        method: method,
        url: SERVERURL + url,
        data: data
      }).then(response=>{
        console.log('data',response)
        resolve(response)
      }).catch(error=>{
        reject(error)
      })
    })
    
}