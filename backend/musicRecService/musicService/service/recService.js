'use-strict'

const AWS = require('aws-sdk')
const axios = require('axios')
const tokenService = require('./tokenService')

const musicRec = async event => {
    return new Promise(async(resolve,reject)=>{
        try {
            const body = JSON.parse(event.body)
            let result, accessToken
            // Spotify에서 accessToken 값 획득
            accessToken = await tokenService.getSpotifyAccessToken()
            console.log(accessToken)
            // Spotify에서 추천 음악 목록 가져오기
            await axios.get(
                'https://api.spotify.com/v1/recommendations', {
                    params: {
                        'seed_genres' : 'k-pop',
                        'min_valence' : 0,
                    },
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

module.exports = {
    musicRec
}