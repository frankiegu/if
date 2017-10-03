import {baseUrl} from './env'
//引入需要增加token的路径，在改路径下header统一发送带参数
import {getToken} from'src/service/getData'
import {getStore} from './mUtils'
export default async(type = 'GET', url = '', query , data = {}, method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if(typeof(query) == 'string' || typeof(query) == 'number'){
    url = url + '/' + query;
  }else{
    let queryStr = ''; //数据拼接字符串
    Object.keys(query).forEach(key => {
      queryStr += key + '=' + query[key] + '&';
    })

    if (queryStr !== '') {
      queryStr = queryStr.substr(0, queryStr.lastIndexOf('&'));
      url = url + '?' + queryStr;
    }
  }
  if (window.fetch && method == 'fetch') {
    //如果路径在tokenPath内，那么就带上token
    let headers = {}
    headers['token'] = getStore('token')
    headers['Accept'] = 'application/json'
    headers['Content-Type'] = 'application/json'
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: headers,
      mode: "cors",
      cache: "force-cache"
    }
    if (type == 'POST' || type == 'PUT') {

      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      var response = await fetch(url, requestConfig);
      // if(response.status == '401'){
      //   //身份认证问题，去认证
      //   getToken()
      // }
      //没有检查status,直接返回了responseText对象
      var responseJson = await response.json();
    } catch (error) {
      throw new Error(error)
    }

    return responseJson
  } else {
    try {
      return new Promise(function (resolve, reject) {
        let requestObj;
        if (window.XMLHttpRequest) {
          requestObj = new XMLHttpRequest();
        } else {
          requestObj = new ActiveXObject;
        }

        let sendData = '';
        if (type == 'POST' || type == 'PUT') {
          sendData = JSON.stringify(data);
        }

        requestObj.open(type, url, true);
        requestObj.setRequestHeader("Content-type", "application/json");
        requestObj.setRequestHeader("token", getStore('token'));
        requestObj.send(sendData);

        requestObj.onreadystatechange = () => {
          if (requestObj.readyState == 4) {
            console.log(requestObj)
            // if(requestObj.status == 401){
            //   //身份认证问题
            //   getToken()
            // }
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj);
          }
        }
      });
    }catch (error){
      throw new Error(error)
    }
















  }
}
