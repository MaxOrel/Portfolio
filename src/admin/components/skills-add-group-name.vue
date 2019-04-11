<template lang="pug">
  .skills-card-title
    .skills-card-title__input
      app-input(
        placeholder="Название новой группы"
        :value="value"
        :errorText="errorText"
        @input="$emit('input', $event)"
        @keydown.native.enter="$emit('approve')"
        autofocus
        no-side-paddings
      )
    .skills-card-title__buttons
      .skills-card-title__btn
        button(type="button" @click="$emit('approve')").btn.is-tick.no-words
      .skills-card-title__btn
        button(type="button" @click="$emit('closeAddingGroup')").btn.is-cross.no-words
</template>

<script>
export default {
  props: {
    value: String,
    errorText: String
  },
  components:{
    appInput: () => import("components/input.vue")
  }
}
</script>
