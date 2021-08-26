/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { DECODE_TOKEN, LOGIN } from "../handler/rmsf"
import { createService } from "rabbitmq-micro-service-framework"

createService('AUTH_SERVICE').then( service => {
  service.registerRpcHandler('login', payload => {
    return LOGIN (payload)
  })

  service.registerRpcHandler('decodeToken', payload => {
    return DECODE_TOKEN (payload)
  })
})