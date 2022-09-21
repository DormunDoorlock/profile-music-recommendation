'use-strict'

const AWS = require('aws-sdk')
const axios = require('axios')

const getSpotifyAccessToken = async params => {
    return new Promise(async (resolve,reject)=>{
        try {
            const client_id = ''
            const client_secret = ''
            const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
            console.log("!")
            await axios.post(
                'https://accounts.spotify.com/api/token',
                'grant_type=client_credentials',
                {
                    headers: {
                      Authorization: 'Basic ' + auth,
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then((result) => {
                console.log(result)
                resolve(result.data.access_token)
            }).catch((err) => {
                console.log(err)
                resolve()
            })
        } catch (error) {
            console.log(error)
        }
    })
}



module.exports ={
    getSpotifyAccessToken
}