<template lang="pug">
    .header
        .container
            .header__info
                .user
                    .user__pic
                        img(src="../../images/content/user.jpg").user__pic-avatar
                    .user__name 
                        span Владимир Астаханов
                .header__title Панель администрирования
            a.exit-btn(@click="logout") Выйти
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["logout"])
  }
};
</script>