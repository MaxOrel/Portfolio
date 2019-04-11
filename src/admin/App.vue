<template lang="pug">

  div.root-wrapper-container
    div.root-container
      template(v-if="$route.meta.public")
        router-view
      template(v-else-if="userIsLogged")
        header.header-container
          app-header

        section.tabs-container
          tabs
          
        main.content-container
          router-view

</template>
<script>
  import { mapState, mapActions, mapGetters } from "vuex";

  
  export default {
    components: {
      appHeader: () => import("components/header"),
      tabs: () => import("components/tabs"),
    },
    computed: {
    ...mapGetters("user", ["userIsLogged"])
  },
};

</script>


<style lang="pcss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800");
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/admin/base-admin.pcss"; /*Общие стили для админки*/
@import "../styles/layout/base.pcss";

@import "../styles/admin/header.pcss";  
@import "../styles/admin/tabs.pcss"; 
@import "../styles/admin/card.pcss"; 
@import "../styles/admin/about-page.pcss"; /*Стилизация элементов страницы about*/
@import "../styles/admin/skill-list.pcss"; 
@import "../styles/admin/skill-card.pcss"; 
@import "../styles/admin/btn-icon.pcss";
@import "../styles/admin/skills.pcss";
@import "../styles/admin/add-new-skill.pcss";
@import "../styles/admin/input.pcss";
@import "../styles/admin/tooltip-error.pcss";

@import "../styles/admin/works.pcss";
@import "../styles/admin/btn-container.pcss";
@import "../styles/admin/tags.pcss";
@import "../styles/admin/edit-form.pcss";
@import "../styles/admin/btn.pcss";
@import "../styles/admin/reviews-section.pcss";
@import "../styles/admin/user-reviews.pcss";

@import "../styles/admin/login.pcss";
</style>