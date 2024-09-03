# 描述

- 登录接口

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
|login |登录接口|
|logout|退出登录接口|

## 1.login
### 请求参数
```
{
    "version": "1.0",
    "sid": "000000000000000000000000000000",
    "module":"login",
    "api":"login",
    "param": {
        "password":"YWRtaW4="
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
|param|json string|请求api带的参数|
|param.password|json string|登录的密码，为base64加密密文，默认登录密码为admin的base64加密YWRtaW4=|


### 返回例子
```
{
    "module": "login",
    "version": "1.0",
    "api": "login",
    "errcode": 0,
    "result": {
        "sid": "a25c00eed70abdf54d03680cfd8be804"
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
|data|array|API返回结果|
|result.sid|string|login获取到的sid，除了设置向导的其他模块api，均需要填写sid|


## 2.logout
### 请求参数
```
{
    "version": "1.0",
    "sid": "a25c00eed70abdf54d03680cfd8be804",
    "module":"login",
    "api":"logout",
    "param": {
        "token":"a25c00eed70abdf54d03680cfd8be804"
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
|param.token|json string|需要退出登录的sid号|

### 返回例子
```
{
    "module": "login",
    "version": "1.0",
    "api": "logout",
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
|result|string|api请求返回接口，logout接口请求返回为空|
|sid|string|请求的sid|

