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
              skills-add

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

export default {
  components: {
    skillsAdd: () => import("components/skills-add"),
    skillsGroup: () => import("components/skills-group")
  },
  data() {
    return {
      showAddingForm: false
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
    ...mapActions('categories',['fetchCategories']),
    ...mapActions('skills',['fetchSkills']),
    filterSkillsByCategoryId(categoryId){
      return this.skills.filter(skill => skill.category === categoryId)
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
