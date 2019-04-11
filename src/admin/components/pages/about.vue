<template lang="pug">
  .about-page-container
    .container
      .about-page__title
        h1.page-title Блок «Обо мне»
        button.about-page__add-new(
          @click="showAddingForm = true"
          v-if="showAddingForm === false"
        ) Добавить группу

    .about-page__content
      .container.container--mobile-wide
        ul.skill-list
          li.skill-list__item(v-if="showAddingForm")
            add-new-skills-group(
              v-model="title"
              :errorText="validation.firstError('title')"
              @closeAddingGroup="close"
              @approve="addSkillGroup"
            )
          li.skill-list__item(
            v-for="category in categories"
            :key="category.id"
            )
            skills-group(
              :category="category"
              :skills="filterSkillsByCategoryId(category.id)"
            )
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],

  validators: {
    title: value => {
      return Validator.value(value).required("Заполните название");
    }
  },

  components: {
    addNewSkillsGroup: () => import("components/skills-add-group"),
    skillsGroup: () => import("components/skills-group")
  },
  data() {
    return {
      showAddingForm: false,
      loading: false,
      title: ""
    };
  },
  computed:{
    ...mapState('categories',{
      categories: state => state.categories 
    }),
    ...mapState('skills',{
      skills: state => state.skills 
    })
  },
  methods: {
    ...mapActions('categories',['addNewSkillGroup' , 'fetchCategories']),
    ...mapActions('skills',['fetchSkills']),

    close() {
      this.showAddingForm = false;
      this.title = "";
    },

    filterSkillsByCategoryId(categoryId){
      return this.skills.filter(skill => skill.category === categoryId)
    },

    async addSkillGroup(){
      try {
        await this.addNewSkillGroup(this.v);
        this.blocked = true;
        this.title = "";
      } catch (error) {
        alert(error.message)
      }
     
    }
  },
  async created(){
    try {
      await this.fetchCategories();
    } catch (error) {
      alert('Произошла ошибка при загрузке категории');
    }

    try {
      await this.fetchSkills();
    } catch (error) {
      alert('Произошла ошибка при загрузке скиллов');
    }
  }
};
</script>
