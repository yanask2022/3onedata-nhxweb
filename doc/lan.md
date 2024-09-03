# 描述

- lan接口

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
|get |获取LAN口信息|
|set |设置LAN口信息，修改lan口ip后系统会重启|

##1、get
### 获取LAN口信息接口参数

```
{
    "version": "1.0",
    "sid": "9f667090acfa315b0e797cd8d28fc6f0",
    "module": "lan",
    "api": "get",
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
    "module": "lan",
    "version": "1.0",
    "api": "get",
    "errcode": 0,
    "result": {
        "ipv4mask": "255.255.255.0",
        "ipv4addr": "192.168.1.1"
    },
    "sid": "9f667090acfa315b0e797cd8d28fc6f0"
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
|result.ipv4mask|string|lan口子网掩码|
|result.ipv4addr|string|lan口ip地址|

##2、set
### 设置LAN口信息请求格式

```
{
    "version": "1.0",
    "sid": "8d85efa6bd8966d7219fa930a0165042",
    "module": "lan",
    "api": "set",
    "param": {
        "ipv4addr": "192.168.1.2",
        "ipv4mask": "255.255.255.0"
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
|param.ipv4addr|string|将lan设置的ip地址|
|param.ipv4mask|string|将lan是指的子网掩码|

### 返回示例
```
{
    "module": "lan",
    "version": "1.0",
    "api": "set",
    "errcode": 0,
    "result": {},
    "sid": "8d85efa6bd8966d7219fa930a0165042"
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
