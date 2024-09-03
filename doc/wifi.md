# 描述

- wifi相关接口

# 接口版本

|版本号|制定人|制定日期|修订日期|
|:---- |:---  |:-----  |-----   |
|1.0   |alan |2022-07-26 |     |

# POST请求地址

```
http://192.168.1.1/api
```

# API列表

|名字|描述|
|:----    |-----   |
|get|获取wif配置|
|set|设置wifi设置|

##1、get
### 获取wifi配置请求参数

```
{
    "version": "1.0",
    "sid": "d0ec44cfd0de6162c4bfe1d4362f03ef",
    "module": "wifi",
    "api": "get",
    "param": {}
}
```

### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|ver|string|API版本|
|sid|string|登后返回的session id|
|module|string|请求的模块|
|api|string|请求的api接口|

### 返回示例

```
{
    "module": "wifi",
    "version": "1.0",
    "api": "get",
    "errcode": 0,
    "result": {
        "guest": {
            "disabled": 1,
            "ssid": "zZzzz+guest",
            "encryption": "none"
        },
        "master": {
            "ssid": "zZzzz",
            "encryption": "mixed-psk",
            "key": "123456789",
            "hidden": 0,
            "disabled": 0
        },
        "radio0": {
            "current_channel": 11,
            "chanlist": [
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
                12,
                13,
                0
            ],
            "bw": "auto",
            "channel": 0
        },
        "radio1": {
            "current_channel": 149,
            "chanlist": [
                36,
                40,
                44,
                48,
                149,
                153,
                157,
                161,
                165,
                0
            ],
            "bw": "auto",
            "channel": 0
        }
    },
    "sid": "9faedbbd29f344990d3a5301381a41d4"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|api|string|请求的api接口|
|errcode|string|返回的错误码|
|sid|string|请求的sid|
|result.master|string|wifi主网络配置信息|
|result.master.ssid|string|wifi主网络的ssid|
|result.master.encryption|string|wifi主网络的加密方式，mixed-psk表示加密，none表示未加密|
|result.master.key|string|wifi主网络在设置mixed-psk时的wifi连接密码|
|result.master.disabled|number|wifi主网络是否开启，0表示开启，1表示关闭|
|result.master.hidden|number|1表示隐藏ssid，0为不隐藏|
|result.guest|string|wifi访客网络配置信息|
|result.guest.ssid|string|wifi访客网络的ssid|
|result.guest.encryption|string|wifi访客网络的加密方式，mixed-psk表示加密，none表示未加密|
|result.guest.key|string|wifi访客网络在设置mixed-psk时的wifi连接秘钥|
|result.guest.disabled|number|wifi访客网络是否开启，0表示开启，1表示关闭|
|result.radio0|string|wifi 2.4G网络的高级配置|
|result.radio0.bw|string|wifi 2.4G网络的带宽模式，HT20、HT40或auto(自动)|
|result.radio0.channel|string|wifi 2.4G网络的信道, 0表示使用自动信道|
|result.radio0.current_channel|string|wifi 2.4G当前工作信道|
|result.radio0.chanlist|array|wifi 2.4G支持信道列表,0为自动信道|
|result.radio1|string|wifi 5G网络的高级配置|
|result.radio1.bw|string|wifi 5G网络的带宽模式，HT20、HT40、HT80或auto(自动)|
|result.radio1.channel|string|wifi 5G网络的信道, 0表示使用自动信道|
|result.radio1.current_channel|string|wifi 5G当前工作信道|
|result.radio1.chanlist|array|wifi 5G支持信道列表,0为自动信道|

##2、set
### 设置wifi接口请求参数

```
{
    "version": "1.0",
    "sid": "cdd2a5d9734c44df74745430dd7a149b",
    "module": "wifi",
    "api": "set",
    "param": {
        "guest": {
            "ssid": "zZZZ-guest",
            "encryption": "none",
			"disabled": 0
        },
        "master": {
            "ssid": "aaZzzz",
            "encryption": "mixed-psk",
            "key": "1234567890",
            "disabled": 0
        },
        "radio0": {
            "bw": "auto",
            "channel": 0
        },
        "radio1": {
            "bw": "auto",
            "channel": 0
        }
    }
}
```

### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|登后返回的session id|
|module|string|请求的模块|
|api|string|请求的api接口|
|param.master|string|wifi主网络配置信息|
|param.master.ssid|string|wifi主网络的ssid|
|param.master.encryption|string|wifi主网络的加密方式，mixed-psk表示加密，none表示未加密|
|param.master.key|string|wifi主网络在设置mixed-psk时的wifi连接密码|
|param.master.disabled|number|wifi主网络是否开启，0表示开启，1表示关闭|
|param.guest|string|wifi访客网络配置信息|
|param.guest.ssid|string|wifi访客网络的ssid|
|param.guest.encryption|string|wifi访客网络的加密方式，mixed-psk表示加密，none表示未加密|
|param.guest.key|string|wifi访客网络在设置mixed-psk时的wifi连接秘钥|
|param.guest.disabled|number|wifi访客网络是否开启，0表示开启，1表示关闭|
|param.radio0|string|wifi 2.4G网络的高级配置|
|param.radio0.bw|string|wifi 2.4G网络的带宽模式，HT20、HT40或auto(自动)|
|param.radio0.channel|string|wifi 2.4G网络的信道, 0表示使用自动信道|
|param.radio1|string|wifi 5G网络的高级配置|
|param.radio1.bw|string|wifi 5G网络的带宽模式，HT20、HT40、HT80或auto(自动)|
|param.radio1.channel|string|wifi 5G网络的信道, 0表示使用自动信道|

### 返回示例
```
{
    "module": "wifi",
    "version": "1.0",
    "api": "set",
    "errcode": 0,
    "result": {
    },
    "sid": "cdd2a5d9734c44df74745430dd7a149b"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|api|string|请求的api接口|
|errcode|string|返回的错误码|
|sid|string|请求的sid|
|result.restart_wifi|bool|修改wifi配置后，是否会重启wifi|
