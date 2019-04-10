<template lang="pug">
  form.add-new-container(
    :class="{'is-blocked' : blocked || loading}"
    @submit.prevent="addNewSkill"
  )
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
export default {
  props: {
    blocked: {
      type: Boolean,
      default: false
    },
    categoryId: Number
  },
}
</script>
