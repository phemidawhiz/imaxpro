'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_KEY: '"77acaca17b3b4403868375f5e5d37261"',
    NEWS_URI: '"https://newsapi.org/v2/top-headlines?sources="',
    LOGIN_URI: '"https://nairastash.com/api/newslogin/"'
    
})
