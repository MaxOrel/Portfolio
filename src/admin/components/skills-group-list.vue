<template lang="pug">
  .card
    .card__title
      .skills-title-container
        .skills-card-title(v-if="editMode===false")
          .skills-card-title__text {{category.category}}
          .skills-card-title__icon
            button(type="button" @click="editMode=true").btn.is-pencil.no-words.grayscale

        .skills-card-title(v-else)
          .skills-card-title__input
            label.input.no-side-paddings
              input(placeholder="Новое название группы" v-model="editedCategory.category").input__elem.field__elem
          .skills-card-title__buttons
            .skills-card-title__btn
              button(type="button" @click="editSkillGroup").btn.is-tick.no-words
            .skills-card-title__btn
              button(type="button" @click="editMode=false").btn.is-cross.no-words
            .skills-card-title__btn
              button(type="button" @click="removeCategory").btn.is-trash.no-words
    .card__content
      .skill-list__table
        skill-table(
          :category="category"
          :skills="skills"
        )
      .add-new
        add-new-skill(
          :categoryId="category.id"
        )
</template>

<script>
import { mapActions } from "vuex"

export default {
  data(){
    return {
      editMode: false,
      editedCategory: {...this.category}
    }
  },
  
  props: {
    category: Object,
    skills: Array
  },
  components:{
    addNewSkill : () => import("components/skills-add-item"),
    skillTable: () => import('components/skills-table-items.vue')
  },
  methods: {
    ...mapActions('categories',['saveSkillGroup', 'removeSkillsGroup']),
    async editSkillGroup(){
      try {
        await this.saveSkillGroup({
          id: this.editedCategory.id,
          title: this.editedCategory.category
        });
        this.editMode = false; // this.skillTitle = "";
      } catch (error) {
        alert(error.message);
      }
     
    },
    async removeCategory() {
      if (confirm("Удалить группу?") === false) return;
      this.editmode = false;
      try {
        const response = await this.removeSkillsGroup(this.editedCategory.id);
      } catch (error) {
        alert(error.message);
      }
    }
  }
}
</script>
