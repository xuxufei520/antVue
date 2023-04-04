import Mock from 'mockjs2'
import { builder, getBody } from '../util'
import store from '@/store'
const username = ['sky', 'user']
const password = ['68cf63c62bc68d71fc41c028375e2f6e']

const login = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }
  const info = { roleId: body.username === 'sky' ? '01' : '02', username: body.username }
  store.commit('SET_CURRENT_INFO', info)
  localStorage.setItem('currentInfo', JSON.stringify(info))
  return builder(
    {
      id: Mock.mock('@guid'),
      name: Mock.mock('@name'),
      username: body.username,
      password: '',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      status: 1,
      telephone: '',
      lastLoginIp: '27.154.74.117',
      lastLoginTime: 1534837621348,
      creatorId: 'admin',
      createTime: 1497160610259,
      deleted: 0,
      roleId: 'admin',
      lang: 'zh-CN',
      token: '4291d7da9005377ec9aec4a71ea837f'
    },
    '',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  )
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
