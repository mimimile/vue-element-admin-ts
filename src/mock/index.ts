import Mock from 'mockjs'
import transactionAPI from './transaction'
import loginAPI from './login'

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 账单服务
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)
