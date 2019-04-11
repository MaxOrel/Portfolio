<template lang="pug">
  .add-new-skills-group
    .card
      .card__title
        .card__title-text
          add-group-name(
            :errorText="errorText"
            @input="$emit('input', $event)"
            @approve="$emit('approve')"
            @closeAddingGroup="$emit('closeAddingGroup')"
          )
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
    addNewSkill : () => import("components/skills-add-item"),
    addGroupName : () => import("components/skills-add-group-name")
  },
  props: {
    value: String,
    errorText: String
  },
  data(){
    return{
      addingBlocked: true,
      editMode: true
    };
  }
};
</script>
