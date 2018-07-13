import Mock from 'mockjs'
import transactionAPI from './transaction'


// 账单服务
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)
