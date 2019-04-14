<template lang="pug">
  button(
    type="button"
    v-on="$listeners"
  ).btn-container
    .btn__text
        .btn__sign
        .btn__title {{title}}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Добавить отзыв"
    }
  }
};
</script>