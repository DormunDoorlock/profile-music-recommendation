'use-strict'

const AWS = require('aws-sdk')
const axios = require('axios')
const qs = require('qs')
//토큰 받기
const getKakaoAccessToken = async params => {
    return new Promise(async (resolve,reject)=>{
        try {
            const {code} = params
            const url = 'https://kauth.kakao.com/oauth/token'
            const rest_api_key = ''
            const redirect_uri= 'http://localhost:3000/login'
            const data = {
                client_id: rest_api_key,
                redirect_uri: redirect_uri,
                code,
                grant_type: 'authorization_code'
            }
            await axios({
                url: url,
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data: qs.stringify(data)
            })
            .then((result) => {
                resolve(result.data)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        } catch (error) {
            console.log(error)
        }
    })
}
//토큰 정보 보기 
const kakaoTokenCheck = async params => {
    return new Promise(async (resolve, reject) => {
        try {
            const { token } = params
            await axios({
                url: 'https://kapi.kakao.com/v1/user/access_token_info',
                method: 'get',
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            .then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            })
        } catch (err) {
            reject(err)
        }
    })
}
// 토큰 갱신하기 
const getKakaoToken = async params => {
    return new Promise(async (resolve, reject) => {
        try {
            const { refreshToken } = params
            const rest_api_key = ''
            const data = {
                client_id: rest_api_key,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            }
            await axios({
                url: 'https://kauth.kakao.com/oauth/token',
                method: 'post',
                headers: {
                    'Authorization': 'Bearer '+token
                },
                data: qs.stringify(data)
            })
            .then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)

            })
        } catch (err) {
        }
    })
}
const getKakaoUserInfo = async params => {
    return new Promise(async (resolve, reject) => {
        try {
            const {token} = params
            await axios({
                url : 'https://kapi.kakao.com/v2/user/me',
                method: 'get',
                headers: {
                    'Authorization': 'Bearer '+token
                }
            })
            .then((result) => { 
                resolve(result.data)
            }).catch((err) => {
                console.log(err)
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports ={
    getKakaoAccessToken,
    kakaoTokenCheck,
    getKakaoToken,
    getKakaoUserInfo
}