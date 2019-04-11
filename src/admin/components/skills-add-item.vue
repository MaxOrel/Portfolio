<template lang="pug">
  form.add-new-container(
    :class="{'is-blocked' : blocked || loading}"
    @submit.prevent="addNewSkill"
  )
    .add-new__inputs
      .add-new__col
        app-input(
          placeholder="Новый навык"
          v-model="skill.title"
          :errorText="validation.firstError('skill.title')"
        )
      .add-new__col.add-new__col_small
        app-input(
          type="number"
          min="0"
          max="100"
          maxlength="3" 
          v-model="skill.percent"
          :errorText="validation.firstError('skill.percent')"
        )
      button(type="submit" data-text="+").add-new__button
</template>

<script>
import { mapActions } from "vuex";
import { Validator } from "simple-vue-validator";

export default {
  mixins: [require("simple-vue-validator").mixin],
  validators: {
    "skill.title": value => {
      return Validator.value(value).required("Заполните название");
    },
    "skill.percent": value => {
      return Validator.value(value)
        .integer("Должно быть числом")
        .between(0, 100, "Некорректное значение для процентов")
        .required("Поле не может быть пустым");
    }
  },
  props: {
    blocked: {
      type: Boolean,
      default: false
    },
    categoryId: Number
  },
  data() {
    return {
      loading: false,
      skill: {
        category: this.categoryId,
        title: "",
        percent: ""
      }
    };
  },
  components: {
    appInput: () => import("components/input.vue")
  },

  methods: {
    ...mapActions("skills", ["addSkill"]),
    async addNewSkill() {
      if ((await this.$validate()) === false) return;

      this.loading = true;
      try {
        const response = await this.addSkill(this.skill);
        this.skill.percent = "";
        this.skill.title = "";

      } catch (error) {


      } finally {
        this.loading = false;
        this.validation.reset();
      }
    }
  }


}
</script>
