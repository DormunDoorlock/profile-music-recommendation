'use-strict'

const AWS = require('aws-sdk')
const tokenService = require('./tokenService')

const logIn = async event => {
    return new Promise(async(resolve,reject)=>{
        try {
            const body = JSON.parse(event.body)
            let result, tokenResult, email, profile
            // 받은 코드로 kakao token 받기
            tokenResult= await tokenExchange(body)
            result={}
            if(tokenResult) {
                body.token = tokenResult.token
                body.refreshToken = tokenResult.refreshToken? tokenResult.refreshToken:undefined
                email = tokenResult.email
                profile = tokenResult.profile
            }
            if(profile){
                result.profile = profile
            }
            console.log(result)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

const tokenExchange = async params => {
    return new Promise(async(resolve,reject)=>{
        try {
           let temp, result
           temp = await tokenService.getKakaoAccessToken(params) 
           if(temp){
               result = { token: temp.access_token, refreshToken: temp.refresh_token }
               const info = await tokenService.getKakaoUserInfo({token: temp.access_token})
               if(info){
                   result.email=info.kakao_account && info.kakao_account.email? info.kakao_account.email:undefined
                   result.profile=info.properties && info.properties.profile_image? info.properties.profile_image:undefined
               }
           }
           resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    logIn
}
