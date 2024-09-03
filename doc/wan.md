# 描述

- WAN接口

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
|set|设置WAN上网模式|
|get|获取WAN配置|
|get_runtime|获取WAN实时状态|

##1、set
### wan设置成static上网参数

```
{
    "version": "1.0",
    "sid": "5bdd8aec153a8ff183387bfcea40e3aa",
    "module":"wan",
    "api":"set",
    "param": {
    	"proto":"static",
        "static": {
            "ipv4addr": "192.168.18.100",
            "ipv4mask": "255.255.255.0",
            "ipv4gateway": "192.168.18.1",
            "ipv4dns1": "114.114.114.114"
        }
    }
}
```

### wan设置成dhcp上网参数
```
{
    "version": "1.0",
    "sid": "5bdd8aec153a8ff183387bfcea40e3aa",
    "module":"wan",
    "api":"set",
    "param": {
    	"proto":"dhcp",
    	"dhcp":{
    		"peerdns":"0",
    		"ipv4dns1":"114.114.114.114",
    		"ipv4dns2":"8.8.8.8"
    	}
    }
}
```

### wan设置成pppoe上网参数
```
{
    "version": "1.0",
    "sid": "5bdd8aec153a8ff183387bfcea40e3aa",
    "module":"wan",
    "api":"set",
    "param": {
        "proto": "pppoe",
        "pppoe": {
            "username": "cHBwb2V0ZXN0",
            "password": "cHBwb2V0ZXN0",
            "peerdns": "1",
            "advance": "0"
        }
    }
}
```

### 请求参数说明


|参数名|类型|说明|
|:-----|:-----|-----|
|ver|string|API版本|
|sid|string|登后返回的session id|
|module|string|请求的模块|
|api|string|请求的api接口|
|param.proto|string|设置WAN口上网方式，dhcp、pppoe、static|
|param.dhcp.peerdns|string|dhcp是否手动设置DNS，0标识手动设置，参数需要带ipv4dns1与ipv4dns2|
|param.dhcp.ipv4dns1|string|peerdns为0时设定，手动设置的第一个dns|
|param.dhcp.ipv4dns2|string|peerdns为0时设定，手动设置的第二个dns|
|param.static.ipv4addr|string|静态上网WAN口的IP地址|
|param.static.ipv4mask|string|静态上网WAN口的掩码|
|param.static.ipv4gateway|string|静态上网WAN口的网关IP|
|param.static.ipv4dns1|string|手动设置的第一个dns，可选设置|
|param.static.ipv4dns2|string|手动设置的第二个dns，可选设置|
|param.pppoe.username|string|pppoe的拨号用户名,base64加密后的密文|
|param.pppoe.password|string|pppoe的拨号密码，base64加密后的密文|
|param.pppoe.peerdns|string|是否手动设置dns，若为0，则需要设置ipv4dns1、ipv4dns2|
|param.pppoe.advance|string|是否需要高级设置，为1时需要制定设置mtu参数|
|param.pppoe.mtu|string|advance设置为1时设置|
|param.pppoe.ipv4dns1|string|peerdns为0时设定，手动设置的第一个dns|
|param.pppoe.ipv4dns2|string|peerdns为0时设定，手动设置的第二个dns|

### 返回示例

```
{
    "module": "wan",
    "version": "1.0",
    "api": "set",
    "errcode": 0,
    "result": {},
    "sid": "9f871caadd083d82cefa516de04ac31a"
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

##2、get
### 获取wan口的配置请求格式

```
{
    "version": "1.0",
    "sid": "3675428b10de8a6c06ac67d5f33db45a",
    "module": "wan",
    "api": "get"
}
```

### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|登后返回的session id|
|module|string|请求的模块|
|api|string|请求的api接口|

### 返回示例
```
{
    "module": "wan",
    "version": "1.0",
    "api": "get",
    "errcode": 0,
    "result": {
        "config": {
            "dhcp": {
                "ipv4dns1": "114.114.114.114",
                "peerdns": "0",
                "ipv4dns2": "8.8.8.8",
                "mtu": "1500"
            },
            "static": {
                "mtu": "1500",
                "ipv4dns1": "114.114.114.114",
                "ipv4gateway": "192.168.18.1",
                "ipv4mask": "255.255.255.0",
                "ipv4addr": "192.168.18.100"
            },
            "pppoe": {
                "username": "cHBwb2V0ZXN0",
                "special_dial": "0",
                "advance": "0",
                "mtu": "1480",
                "peerdns": "1",
                "password": "cHBwb2V0ZXN0"
            }
        },
        "proto": "dhcp"
    },
    "sid": "3675428b10de8a6c06ac67d5f33db45a"
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
|result.config.proto|string|当前wan的工作模式|
|result.config.dhcp|string|wan口使用dhcp时的配置，子字段参考set接口|
|result.config.static|string|wan口使用static时的配置，子字段参考set接口|
|result.config.pppoe|string|wan口使用pppoe时的配置，子字段参考set接口|

##3、get_runtime
### 请求参数说明

```
{
    "version": "1.0",
    "sid": "49bb324560eb4eaf3c6d9ed652ca1e8c",
    "module": "wan",
    "api": "get_runtime",
    "param": {}
}
```

### 请求参数说明

|参数名|类型|说明|
|:-----|:-----|-----|
|version|string|API版本|
|sid|string|登后返回的session id|
|module|string|请求的模块|
|api|string|请求的api接口|

### 返回示例
```
{
    "module": "wan",
    "version": "1.0",
    "api": "get_runtime",
    "errcode": 0,
    "result": {
        "status": {
            "cable": true,
            "ipv4dns2": "8.8.8.8",
            "up": true,
            "ipv4dns1": "114.114.114.114",
            "ipv4gateway": "192.168.18.1",
            "ipv4mask": "255.255.255.0",
            "ipv4addr": "192.168.18.248"
        },
        "proto": "dhcp"
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
|result.proto|string|当前wan的工作模式|
|result.status.cable|string|wan口网线是否连接|
|result.status.up|string|wan口是否获取到ip地址|
|result.status.ipv4addr|string|wan口的ip地址|
|result.status.ipv4mask|string|wan口的子网掩码|
|result.status.ipv4gateway|string|wan口的网关地址|
|result.status.ipv4dns1|string|wan口的第一个dns地址|
|result.status.ipv4dns2|string|wan口的第二个dns地址|

