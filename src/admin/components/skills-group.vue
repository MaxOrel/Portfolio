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
        .skills-table-container
          table.skills

            skill-item(
              v-for="skill in skills"
              :key="skill.id"
              :skill="skill"
            )
      .add-new
        form(@submit.prevent="addNewSkill").add-new-container
          .add-new__inputs
            .add-new__col
              label.input
                input(placeholder="Новый навык" v-model="skill.title").input__elem.field__elem
            .add-new__col.add-new__col_small
              label.input
                input(type="number" min="0" max="100" maxlength="3" v-model="skill.percent").input__elem.field__elem
            button(type="submit" data-text="+").add-new__button
</template>

<script>
import { mapActions } from "vuex"

export default {
  props: {
    category: Object,
    skills: Array
  },
  data(){
    return {
      skill:{
        category: this.category.id,
        title: "",
        percent: ""
      },
      editMode: false,
      editedCategory: {...this.category}
    }
  },
  components:{
    skillItem: () => import('components/skills-item.vue')
  },
  methods: {
    ...mapActions('skills',['addSkill']),
    ...mapActions('categories',['saveSkillGroup', 'removeSkillsGroup']),
    async addNewSkill(){
      try {
        await this.addSkill(this.skill);
        this.skill.title="";
        this.skill.percent="";
      } catch (error) {
         alert('Произошла ошибка при загрузке скилла');
      }
    },
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
