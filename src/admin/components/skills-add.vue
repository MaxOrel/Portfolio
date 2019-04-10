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
          add-new-skill(
            :blocked="addingBlocked"
          )
          
</template>
<script>
import { mapActions } from "vuex";

export default {
  components:{
    addNewSkill : () => import("components/skills-add-item")
  },
  data(){
    return{
      addingBlocked: true,
      skillTitle: ""
    }
  },
  methods: {
    ...mapActions('categories',['addNewSkillGroup']),
    async addSkillGroup(){
      try {
        await this.addNewSkillGroup(this.skillTitle);
        this.blocked = true;
      } catch (error) {
        alert(error.message)
      }
     
    }
  }
}
</script>
