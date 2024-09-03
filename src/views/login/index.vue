<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title"> {{ $t('login.title') }}</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          prefix-icon="el-icon-user"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          prefix-icon="el-icon-lock"
          :placeholder="$t('login.password')"
          :type="passwordType"
          name="password"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />

      </el-form-item>

      <el-button
        :disabled="loading"
        class="login-btn"
        @click.native.prevent="handleLogin"
      >{{ $t('login.logIn') }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
      // if (!validUsername(value)) {
      //   callback(new Error('Please enter the correct user name'))
      // } else {
      //   callback()
      // }
    }
    const validatePassword = (rule, value, callback) => {
      callback()
      // if (value.length < 6) {
      //   callback(new Error('The password can not be less than 6 digits'))
      // } else {
      //   callback()
      // }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #FFFFFF;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {

    input {
      width: 100%;
      border-radius: 0;
      //border: solid #ff4949;
      border: solid black;
      border-width: 0 0 0.1px;
      font-size: 16px;
      color: rgba(0, 0, 0, .65);
      text-align: left;
      height: 42px;
      line-height: 42px;
      //&:-webkit-autofill {
      //  box-shadow: 0 0 0px 1000px $bg inset !important;
      //  -webkit-text-fill-color: $cursor !important;
      //}
    }

    .el-icon-user {
      font-size: 19px;
      color: #000;
    }

    .el-icon-lock {
      font-size: 19px;
      color: #000;
    }

    .el-input__inner:focus {
      border-radius: 0 !important;;
      //border: solid #2096f3 !important;;
      border: solid black !important;;
      border-width: 0 0 2px !important;;
    }
  }

  .el-form-item__error {
    color: #ff4081;
  }

  .el-form-item {
    padding-top: 15px;
    margin-bottom: 22px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #FFFFFF;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  display: flex;
  align-items: center;
  overflow: hidden;

  .login-form {
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
    background: #ffffff;
    position: relative;
    width: 440px;
    height: 338px;
    max-width: 100%;
    padding: 35px 35px 0 35px;
    margin: 0 auto;
    overflow: hidden;
  }
  .login-btn {
    width: 270px;
    height: 64px;
    border-radius: 100px;
    background-color: #ff4081;
    font-size: 18px;
    text-align: center;
    border: 0;
    display: block;
    color: #fff;
    font-weight: 400;
    cursor: pointer;
    margin: 24px 0 16px;
    outline: none;
    background-image: -webkit-gradient(linear,right top,left top,from(transparent),color-stop(50%,transparent),color-stop(50%,#ee2167),to(#ee2167));
    background-image: linear-gradient(270deg,transparent,transparent 50%,#ee2167 0,#ee2167);
    background-position: 100% 0;
    background-size: 200% 100%;
    -webkit-transition: all .25s ease-in;
    transition: all .25s ease-in;
  }
}
</style>
