<template lang="pug">
  .add-new-skills-group
    .card
      .card__title
        .card__title-text
        .skills-card-title
          .skills-card-title__input
            label.input.no-side-paddings
              input(placeholder="Название новой группы" v-model="skillTitle").input__elem.field__elem
          .skills-card-title__buttons
            .skills-card-title__btn
              button(type="button" @click="addSkillGroup").btn.is-tick.no-words
            .skills-card-title__btn
              button(type="button").btn.is-cross.no-words
      .card__content
        .add-new
          form.add-new-container.is-blocked
            .add-new__inputs
              .add-new__col
                label.input.no-side-paddings
                  input(placeholder="Новый навык").input__elem.field__elem
              .add-new__col.add-new__col_small
                label.input
                  input(type="number" min="0" max="100" maxlength="3").input__elem.field__elem
              button(type="submit" data-text="+").add-new__button
</template>
<script>
import { mapActions } from "vuex";

export default {
  data(){
    return{
      skillTitle: ""
    }
  },
  methods: {
    ...mapActions('categories',['addNewSkillGroup']),
    async addSkillGroup(){
      try {
        await this.addNewSkillGroup(this.skillTitle);
        this.skillTitle = "";
      } catch (error) {
        alert(error.message)
      }
     
    }
  }
}
</script>
