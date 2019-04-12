<template lang="pug">
  tr.skills-row-wrapper(v-if="editMode===false")
    td.skills__cell {{skill.title}}
    td.skills__cell
      .skills__input
        .skills__input-text {{skill.percent}}
    td.skills__cell
      button(type="button" @click="editMode=true").btn.is-pencil.no-words.grayscale
    td.skills__cell
      button(type="button" @click="removeExistedSkill").btn.is-trash.no-words.grayscale

  tr.skills-row-wrapper(v-else)
    td.skills__cell
      .skills__cell-input-wrapper
        label.input.no-side-paddings
        input(v-model="editedSkill.title").input__elem.field__elem
    td.skills__cell
      .skills__cell-input-wrapper
        label.input.no-side-paddings
        input(type="number" min="0" max="100" maxlength="3" v-model="editedSkill.percent").input__elem.field__elem
    td.skills__cell
      button(type="button" @click="saveSkill").btn.is-tick.no-words
    td.skills__cell
      button(type="button" @click="editMode=false").btn.is-cross.no-words
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data(){
    return{
      
      editMode: false,
      editedSkill: {...this.skill}
      
    }
  },
  props: {
    skill: Object
  },  
  methods: {
    ...mapActions("skills", ["removeSkill", "editSkill"]),
    async removeExistedSkill() {
      try {
        await this.removeSkill(this.skill.id);
      } catch {}
    },
    async saveSkill() {
      try {
        await this.editSkill(this.editedSkill);
        this.editMode = false;
      } catch {}
    }
  }
}
</script>
