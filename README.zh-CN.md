## 前置要求
- Node.js 16.20.0
```bash
# 使用nvm安装node
nvm install v16.20.0
# 设为默认版本
nvm alias default v16.20.0
```


## 开发

```bash
# 克隆项目
git clone git@ssh.dev.azure.com:v3/lede/NHX-PACKAGES/NHX-VUE

# 进入项目目录
cd NHX-VUE

# 安装依赖
npm install

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```