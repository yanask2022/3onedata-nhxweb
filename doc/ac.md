# 描述

- AC

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
|mode_get |获取模式|
|mode_set|设置模式|
|group_get |获取组|
|group_add|增加组|
|group_modify |修改组|
|group_del|删除组|

## mode_get
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"mode_get"
}
```
### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|


### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "mode_get",
    "errcode": 0,
    "result": {
        "mode": "ap"
    },
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|
|result.mode|string|ap为AP模式，ac为AC模式|

## get_aplist
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"get_aplist"
}
```
### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|

### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
  "version": "1.0",
    "errcode": 0,
    "result": {
        "aplist": [
	        "id": "00:11:22:33:44:55",
	        "online": 1111,
	        "ip": "192.168.1.11",
	        "version": "1.1.0-1111"
        ],
    },
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|
|result.mode|string|ap为AP模式，ac为AC模式|

## mode_set
### 请求参数
```
{
    "version": "1.0",
    "sid": "a25c00eed70abdf54d03680cfd8be804",
    "module":"ac",
    "api":"mode_set",
    "param": {
        "mode":"ap"
    }
}
```

### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|login获取到的session id|
|module|string|请求的模块|
|api|string|请求的api接口|
|param|json string|请求api带的参数|
|param.mode|string|ap为AP模式，ac为AC模式|

### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "mode_set",
    "errcode": 0,
    "result": {},
    "sid": "a25c00eed70abdf54d03680cfd8be804"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|api|string|请求的api名称|
|errcode|string|返回的错误码|
|result|string|api请求返回接口|
|sid|string|请求的sid|

## group_get
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"group_get"
}
```
### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|


### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "mode_get",
    "errcode": 0,
    "result": [
        {
            "comment": "ggg",
            "iname": "g1"
        },
        {
            "comment": "ttt",
            "iname": "g2"
        }
    ],
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|
|result|array|为空的话，则返回{}，否则为数组|
|comment|string|组名称|
|iname|string|组内部名称，不允许改动，后续api用到|

## group_add
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"group_add",
    "param": {
    	"commnet": "ggg1"
    }
}
```
### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|


### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "group_add",
    "errcode": 0,
    "result":{},
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|
|param|string|为空的话，则返回{}，否则为数组|
|param.comment|string|组名称|

## group_modify
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"group_modify",
    "param": {
    	"commnet": "ggg1",
    	"group": "g1"
    }
}
```
### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|
|param.comment|string|组名称|
|param.group|string|group_get获取的iname|

### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "group_modify",
    "errcode": 0,
    "result":{},
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|

## group_del
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"group_del",
    "param": {
    	"group": "g1"
    }
}
```
### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|
|param.group|string|group_get获取的iname|

### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "group_modify",
    "errcode": 0,
    "result":{},
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|

## group\_get\_device
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"group_get_device",
    "param": {
    	"group": "g1"
    }
}
```

### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|
|param|string|为空的话，则返回{}，否则为数组|
|param.device|string|需要添加的设备ID|
|param.group|string|group_get获取的iname|

### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "group_modify",
    "errcode": 0,
    "result":{
    	"device": "00:11:22:33:44:55 10:20:30:40:50:60"
    },
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|
|result|string|为空的话，则返回{}，否则为数组|
|result.device|string|组设备|







## group\_add\_device
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"group_add_device",
    "param": {
    	"group": "g1",
    	"device": "00:11:22:33:44:55 10:20:30:40:50:60"
    }
}
```

### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|
|param|string|为空的话，则返回{}，否则为数组|
|param.device|string|需要添加的设备ID|
|param.group|string|group_get获取的iname|

### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "group_modify",
    "errcode": 0,
    "result":{},
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|
|param|string|为空的话，则返回{}，否则为数组|
|param.group|string|group_get获取的iname|








## group\_del\_device
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"group_del_device",
    "param": {
    	"group": "g1"
    }
}
```

### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|
|param|string|为空的话，则返回{}，否则为数组|
|param.device|string|需要添加的设备ID|
|param.group|string|group_get获取的iname|

### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "group_modify",
    "errcode": 0,
    "result":{},
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|

## group\_get\_config
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"group_get_config",
    "param": {
    	"group": "g1"
    }
}
```

### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|
|param|string|为空的话，则返回{}，否则为数组|
|param.group|string|group_get获取的iname|

### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "group_modify",
    "errcode": 0,
    "result": {
        "raido1": {
            "hwmode": "auto",
            "txpower": "11",
            "htmode": "HT20",
            "country": "US"
        },
        "raido0": {
            "hwmode": "auto",
            "txpower": "11",
            "htmode": "HT40",
            "country": "CN"
        },
        "wlan1": {
             'key': '',
            'hidden': 0,
            'disabled': 1,
            'ssid': 'OpenWrt',
            'encryption': 'none',
            'isolate': 0
            },
        "wlan0": {
                'key': '',
            'isolate': 0,
            'hidden': 0,
            'disabled': 1,
            'ssid': 'OpenWrt',
            'encryption': 'none'
        }
    },
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|
|result|string|结果|
|result.radio1|string|radio1结果|
|result.wlan1|string|wlan1结果|
|result.radio0|string|radio0结果|
|result.wlan0|string|wlan0结果|

## group\_set\_config
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"ac",
    "api":"group_set_config",
    "param": {
    	"group": "g1",
        "group": "g1",
        "radio1": {
            "txpower": "11",
            "htmode": "HT20",
            "hwmode": "auto",
            "country": "US",
            "channel": "149"
        },
        "wlan1": {
            "ssid": "11",
            "encryption": "none"
        },
        "radio0": {
            "txpower": "11",
            "htmode": "HT40",
            "hwmode": "auto",
            "country": "CN",
            "channel": "1"
        },
        "wlan0": {
            "ssid": "22",
            "encryption": "none"
        },
    }
}
```

### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|session id,登录为全0|
|module|string|请求的模块|
|api|string|请求的api接口|
|param|string|为空的话，则返回{}，否则为数组|
|param.group|string|group_get获取的iname|

### 返回例子
```
{
    "module": "ac",
    "version": "1.0",
    "api": "group_modify",
    "errcode": 0,
    "result": {
    },
    "sid": "000000000000000000000000000000"
}
```

### 返回参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|module|string|请求的模块|
|version|string|api版本|
|sid|string|请求的sid|
|api|string|请求的api名称|
|errcode|string|返回的错误码|
|result|string|结果|
