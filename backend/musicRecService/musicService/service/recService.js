'use-strict'

const AWS = require('aws-sdk')
const axios = require('axios')
const tokenService = require('./tokenService')

const musicRec = async event => {
    return new Promise(async(resolve,reject)=>{
        try {
            console.log(event)
            const body = JSON.parse(event.body)
            // body에서 받은 감정값 변환 부분 필요
            console.log(body)
            let spotifyParams, accessToken
            // Spotify에서 accessToken 값 획득
            spotifyParams = await calParams(body)
            console.log(spotifyParams)
            accessToken = await tokenService.getSpotifyAccessToken()
            console.log(accessToken)
            // Spotify에서 추천 음악 목록 가져오기
            await axios.get(
                'https://api.spotify.com/v1/recommendations', {
                    params: spotifyParams,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken,
                    }
                }
            )
            .then((result) => {
                console.log(result.data)
                resolve(result.data)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const calParams = async params => {
    return new Promise(async(resolve,reject)=>{
        try {
            let result={}
            console.log(params)
            result.seed_genres = 'k-pop,pop'
            const {happy, sad, angry, fearful, disgusted, surprised, neutral} = params
            const paramsArray = [happy, sad, angry, fearful, disgusted, surprised, neutral]
            const danceWeight = [0.8, 0.1, 0.2, 0.1, 0.1, 0.1, 0.5]
            const energyWeight = [0.8, 0.1, 0.4, 0.3, 0.2, 0.6, 0.5]
            const loudWeight = [-4, -12, -8, -10, -8, -6, -8]
            const valenceWeight = [0.8, 0.1, 0.3, 0.2, 0.1, 0.2, 0.5]
            const tempoWeight = [160, 90, 140, 140, 100, 140, 125]
            // check Mode
            if(neutral > 0.9){
                result.target_mode = 1
            }else if(happy > 0.6){
                result.target_mode = 1
            }else if(sad > 0.6){
                result.target_mode = 0
            }

            // check Danceability 
            result.target_danceability = 0
            paramsArray.forEach((param, index) => {
                result.target_danceability += param * danceWeight[index]
            })

            // check Energy
            result.target_energy = 0
            paramsArray.forEach((param, index) => {
                result.target_energy += param * energyWeight[index]
            })

            // check Loundness
            result.target_loudness = 0
            paramsArray.forEach((param, index) => {
                result.target_loudness += param * loudWeight[index]
            })

            // check Valence
            result.target_valence = 0
            paramsArray.forEach((param, index) => {
                result.target_valence += param * valenceWeight[index]
            })

            // check Tempo
            result.target_tempo = 0
            paramsArray.forEach((param, index) => {
                result.target_tempo += param * tempoWeight[index]
            })
            
            console.log(result)
            resolve(result)

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    musicRec
}