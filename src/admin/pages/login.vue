<template lang="pug">
    .login
        .login__content
          form.login__form(@submit.prevent="login")
            .login__form-title Авторизация
            button.login__form-close
            .login__row
              app-input(
                title="Логин"
                icon="user"
                v-model="user.name"
                :errorText="validation.firstError('user.name')"
              )
            .login__row
              app-input(
                title="Пароль"
                icon="key"
                type="password"
                v-model="user.password"
                :errorText="validation.firstError('user.password')"
              )
            .login__btn
              button(
                type="submit"
                :disabled="disableSubmit"
              ).login__send-data Отправить
</template>

<script>
  import { Validator } from "simple-vue-validator";
  import axios from "axios";
  import appInput from "../components/input";

  axios.defaults.baseURL = 'https://webdev-api.loftschool.com';

  export default {
    
    mixins: [require("simple-vue-validator").mixin],
    validators: {
      "user.name": value => {
        return Validator.value(value).required("Введите имя пользователя");
      },
      "user.password": value => {
        return Validator.value(value).required("Введите пароль");
      }
    },
    data() {
      return {
        disableSubmit: false,
        user: {
          name: "",
          password: ""
        }
      };
    },
    components: {
      appInput
    },
    methods: {
      async login() {
        if ((await this.$validate()) === false) return;
        this.disableSubmit = true;
        try {
          
          axios
            .post("/login", {
              name: this.user.name,
              password: this.user.password
            })
            .then(response => {
              const report = JSON.stringify(response, null, 2);
               this.disableSubmit = false;
               console.log(report);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>