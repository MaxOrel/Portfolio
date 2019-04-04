<template lang="pug">
    .login
        .login__content
          button(type="button").login__form-close
          form.login__form(@submit.prevent="login")
            .login__form-title Авторизация
            
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
  // import appInput from "components/input";
  import { setToken, setAuthHttpHeaderToAxios } from "@/helpers/token.js";

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
      // appInput
      appInput: () => import("../components/input.vue")
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
              const token = response.data.token;
              setToken(token);

              this.disableSubmit = false;
              console.log(token);
            })
            .catch(error => {
               this.disableSubmit = false;
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>