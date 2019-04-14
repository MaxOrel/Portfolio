<template lang="pug">
  ul.tags
    template(v-if="interactive")
      li.tags__item.tags__item_interactive(v-for="(tag, index) in tags" :key="tag")
        span {{tag}} 
        a.tags__remove(@click="$emit('remove', index)")

    template(v-else)
      li.tags__item(v-for="tag in tags" :key="tag") {{tag}} 
</template>

<script>
export default {
  props: {
    tags: Array,
    interactive: {
      type: Boolean,
      default: false
    }
  }
};
</script>
