<template lang="pug">
  label.input(
    v-if="fieldType === 'input'" 
    :class="[{'input_labeled' : !!title, 'no-side-paddings' : noSidePaddings}, iconClass, {'error' : !!errorText}]"
  )
    span.input__title(v-if="title") {{title}} 
    input(
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ).input__elem.field__elem
    .input__error-tooltip
      errors-tooltip(
        :errorText="errorText"
      )
  label.textarea(
    v-else-if="fieldType === 'textarea'"
    v-bind="$attrs"
    :class="{'error': !!errorText}"
  )
    .input__title(v-if="title") {{title}} 
    textarea.textarea__elem.field__elem(
      :value="value"
      :class="{'error' : !!errorText}"
      @input="$emit('input', $event.target.value)"
    )
    .input__error-tooltip
      errors-tooltip(
        :errorText="errorText"
      )  
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: String,
    errorText: String,
    icon: {
      type: String,
      default: ""
    },
    noSidePaddings: Boolean,
    fieldType: {
      type: String,
      default: "input"
    },
    value: String || Number
  },
  computed: {
    iconClass() {
      const iconName = this.icon;
      return iconName.length ? ` input_iconed input_icon-${iconName}` : "";
    }
  },
  components: {
    errorsTooltip: () => import("components/errors-tooltip.vue")
  }
};
</script>