module.exports = [
  {
    url: '/get-aplist',
    type: 'post',
    response: config => {
      return {
        'module': 'ac',
        'version': '1.0',
        'errcode': 0,
        'result': {
          'aplist': [
            {
              'id': '00:11:22:33:44:55',
              'online': '1111',
              'ip': '192.168.1.11',
              'version': '1.1.0-1111'
            }
          ]
        },
        'sid': '000000000000000000000000000000'
      }
    }
  },
  {
    url: '/get-group',
    type: 'post',
    response: config => {
      return {
        'module': 'ac',
        'version': '1.0',
        'api': 'group_get',
        'errcode': 0,
        'result': [
          {
            'comment': 'ggg',
            'iname': 'g1'
          },
          {
            'comment': 'ttt',
            'iname': 'g2'
          }
        ],
        'sid': '000000000000000000000000000000'
      }
    }
  },
  {
    url: '/del-group',
    type: 'post',
    response: config => {
      return {
        'module': 'ac',
        'version': '1.0',
        'api': 'group_modify',
        'errcode': 0,
        'result': {},
        'sid': '000000000000000000000000000000'
      }
    }
  },
  {
    url: '/group-set-config',
    type: 'post',
    response: config => {
      return {
        'module': 'ac',
        'version': '1.0',
        'api': 'group_modify',
        'errcode': 0,
        'result': {},
        'sid': '000000000000000000000000000000'
      }
    }
  },
  {
    url: '/group-get-config',
    type: 'post',
    response: config => {
      return {
        'module': 'ac',
        'version': '1.0',
        'api': 'group_modify',
        'errcode': 0,
        'result': {
          'radio0': {
            'hwmode': '11axg',
            'disabled': 0,
            'wifi6': '1',
            'htmode': 'auto',
            'freq': '2.4G',
            'current_channel': 1,
            'chanlist': [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              0
            ]
          },
          'radio1': {
            'hwmode': '11axa',
            'disabled': 0,
            'wifi6': '1',
            'htmode': 'auto',
            'freq': '5G',
            'current_channel': 165,
            'chanlist': [
              36,
              40,
              44,
              48,
              52,
              56,
              60,
              64,
              100,
              104,
              108,
              112,
              116,
              120,
              124,
              128,
              132,
              136,
              140,
              144,
              149,
              153,
              157,
              161,
              165,
              0
            ]
          },
          'wlan10': {
            'key': '',
            'hidden': 0,
            'disabled': 1,
            'ssid': 'OpenWrt',
            'encryption': 'none',
            'isolate': 0
          },
          'wlan0': {
            'key': '',
            'isolate': 0,
            'hidden': 0,
            'disabled': 1,
            'ssid': 'OpenWrt',
            'encryption': 'none'
          }
        },
        'sid': '000000000000000000000000000000'
      }
    }
  },
  {
    url: '/group_add_device',
    type: 'post',
    response: config => {
      return {
        'module': 'ac',
        'version': '1.0',
        'api': 'group_modify',
        'errcode': 0,
        'result': {},
        'sid': '000000000000000000000000000000'
      }
    }
  }
]
