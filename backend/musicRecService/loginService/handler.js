'use strict';

const loginService = require('./service/loginService')

let headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

module.exports.logIn = async event => {
  try { 
    let result
    result = await loginService.logIn(event)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    }
  } catch(error) {
    const err = {
      statusCode: 400,
      body: JSON.stringify(error)
    }
    return err
  }
};