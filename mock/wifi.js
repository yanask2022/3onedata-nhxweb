module.exports = [
  {
    url: '/wifi',
    type: 'post',
    response: config => {
      return {
        'module': 'wifi',
        'version': '1.0',
        'api': 'get',
        'errcode': 0,
        'result': {
          'wlan0': {
            'isolate': 0,
            'hidden': 0,
            'disabled': 0,
            'ssid': 'OpenWrt',
            'encryption': 'none',
            'key': ''
          },
          'radio1': {
            'hwmode': '11axa',
            'disabled': 0,
            'wifi6': '1',
            'htmode': 'auto',
            'freq': '5G',
            'current_channel': 36,
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
          'wlan13': {
            'key': '',
            'hidden': 0,
            'disabled': 1,
            'ssid': 'OpenWrt',
            'encryption': 'none'
          },
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
          'wlan11': {
            'key': '',
            'hidden': 0,
            'disabled': 1,
            'ssid': 'OpenWrt',
            'encryption': 'none'
          },
          'wlan12': {
            'key': '',
            'hidden': 0,
            'disabled': 1,
            'ssid': 'OpenWrt',
            'encryption': 'none'
          },
          'sta0': {
            'disabled': 1,
            'ssid': 'OpenWrt-Sta',
            'encryption': 'none'
          },
          'wlan3': {
            'key': '',
            'isolate': 0,
            'hidden': 0,
            'disabled': 1,
            'ssid': 'OpenWrt',
            'encryption': 'none'
          },
          'wlan2': {
            'key': '',
            'hidden': 0,
            'disabled': 1,
            'ssid': 'OpenWrt',
            'encryption': 'none',
            'isolate': 0
          },
          'wlan10': {
            'key': '',
            'hidden': 0,
            'disabled': 0,
            'ssid': 'OpenWrt',
            'encryption': 'none'
          },
          'wlan1': {
            'key': '',
            'isolate': 0,
            'hidden': 0,
            'disabled': 1,
            'ssid': 'OpenWrt',
            'encryption': 'none'
          },
          'sta1': {
            'disabled': 1,
            'ssid': 'OpenWrt-Sta',
            'encryption': 'none'
          }
        },
        'sid': config.body.sid
      }
    }
  },
  {
  //  TODO
  }
]
