//导入axios实例文件中方法
import {get, post, put, deletes} from './all-http';

let base_api = '/chat'

export const getUserListHttp = (queryGroup, groupToken) => {
  return get(`${base_api}/user?queryGroup=` + queryGroup + `&groupToken=` + groupToken, {});
}

export const sendMessageHttp = (userToken, targetToken, content, type) => {
  return post(`${base_api}/message`, {
    userToken: userToken,
    targetToken: targetToken,
    content: content,
    type: type
  })
}
// 基本用法
// import API from '@/utils/api'
// getUserInfo(){
//     API.getUserInfoById('01).then((result)=>{
//      }).catch((error)=>{
//    })
//   }
