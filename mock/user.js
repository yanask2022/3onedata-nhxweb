const tokens = {

  admin: {
    token: 'a25c00eed70abdf54d03680cfd8be804'
  },
  access_point: {
    token: 'access_point-token'
  },
  sta: {
    token: 'sta-token'
  },
  ap_router: {
    token: 'ap_router-token'
  },
  ap_client_router: {
    token: 'ap_client_router-token'
  }
}

const users = {
  'a25c00eed70abdf54d03680cfd8be804': {
    roles: ['ac'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'access_point-token': {
    roles: ['ap'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Access Point'
  },
}

module.exports = [
  // user login
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body.param
      // console.log('username', config.body.param.username)
      // console.log('password', password)
      return {
        'module': 'login',
        'version': '1.0',
        'api': 'login',
        'errcode': 0,
        'result': {
          'sid': tokens[username].token
        },
        'sid': '000000000000000000000000000000'
      }
    }
  },
  {
    url: '/logout',
    type: 'post',
    response: config => {
      return {
        module: 'login',
        version: '1.0',
        api: 'logout',
        errcode: 0,
        result: {},
        sid: config.body.sid
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'post',
    response: config => {
      // const { token } = config.query
      // const info = users[token]
      //
      // // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }
      //
      // return {
      //   code: 20000,
      //   data: info
      // }
      const { token } = config.body.param
      return {
        module: 'user',
        version: '1.0.0',
        api: 'info',
        errcode: 0,
        result: {
          roles: ['ac']
        },
        sid: config.body.sid
      }
    }
  },
  {
    url: '/mockError',
    type: 'post',
    response: config => {
      return {
        module: 'login',
        version: '1.0',
        api: 'logout',
        errcode: -1006,
        result: {},
        sid: config.body.sid,
        msg: 'NHX_ERRCODE_AUTH_FAILED'
      }
    }
  }
]
