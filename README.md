## Prerequisites
- Node.js 16.20.0
```bash
# use nvm install node
nvm install v16.20.0
# set as default
nvm alias default v16.20.0
```

## Getting started

```bash
# clone the project
git clone git@ssh.dev.azure.com:v3/lede/NHX-PACKAGES/NHX-VUE

# enter the project directory
cd NHX-VUE

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9527

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```