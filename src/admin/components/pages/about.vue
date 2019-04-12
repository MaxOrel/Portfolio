<template lang="pug">
  .about-page-container
    .container
      .about-page__title
        h1.page-title Блок «Обо мне»
        button.about-page__add-new(
          v-if="showAddingForm === false"
          @click="showAddingForm = true"
        ) Добавить группу

    .about-page__content
      .container.container--mobile-wide
        ul.skill-list
          li.skill-list__item(
            v-if="showAddingForm"
            :class="{'loading': loading}"
          )
            add-new-skills-group(
              v-model="titleNewGroup"
              :errorText="validation.firstError('titleNewGroup')"
              @closeAddingGroup="close"
              @approve="addSkillGroup"
            )
          li.skill-list__item(
            v-for="category in categories"
            :key="category.id"
            )
            skills-group-list(
              :category="category"
              :skills="filterSkillsByCategoryId(category.id)"
            )
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],

  validators: {
    titleNewGroup: value => {
      return Validator.value(value).required("Заполните название");
    }
  },

  components: {
    addNewSkillsGroup: () => import("components/skills-add-group"),
    skillsGroupList: () => import("components/skills-group-list")
  },
  data() {
    return {
      showAddingForm: false,
      loading: false,
      titleNewGroup: ""
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
    ...mapMutations("skills", ["ADD_SKILLS_CATEGORY"]),
    close() {
      this.showAddingForm = false;
      this.titleNewGroup = "Test";
    },

    filterSkillsByCategoryId(categoryId){
      return this.skills.filter(skill => skill.category === categoryId)
    },

    async addSkillGroup(){

      if ((await this.$validate()) === false) return;

      this.loading = true;

      try {
        await this.addNewSkillGroup(this.titleNewGroup);
        this.showAddingForm = false;
        this.titleNewGroup = "";
        
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false;
        this.validation.reset();
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
