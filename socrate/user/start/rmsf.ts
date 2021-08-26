/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { createService } from "rabbitmq-micro-service-framework"
import { DELETE_USER, FIND_USER, USER_REGISTER, VERIFY_USER } from "../handler/rmsf"

createService('USER_SERVICE').then( service => {
  service.registerRpcHandler('register', payload => {
    return USER_REGISTER(payload)
  })

  service.registerRpcHandler('findUser', payload => {
    return FIND_USER (payload)
  })

  service.registerRpcHandler('verifyUser', payload => {
    return VERIFY_USER (payload)
  })

  service.registerRpcHandler('deleteUser', payload => {
    return DELETE_USER (payload)
  })
})