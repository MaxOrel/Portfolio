<template lang="pug">
.skills-table-container
  table.skills
    skill-table-item-single(
      v-for="skill in skills"
      :key="skill.id"
      :skill="skill"
    )
</template>

<script>
// import { mapActions, mapState } from "vuex";

export default {
  components: {
    skillTableItemSingle : ()=> import ('components/skill-table-item-single')
  },
  props: {
    category: Object,
    skills: Array
  }
};
</script>
