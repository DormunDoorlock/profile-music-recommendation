'use strict';

const musicRecService = require('./service/recService')

let headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

module.exports.musicRec = async event => {
  try {
    let result
    result = await musicRecService.musicRec(event)
    return{
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    }
  } catch (error) {
    const err = {
      statusCode: 400,
      body: JSON.stringify(error)
    }
    return err
  }
};