<template lang="pug">
    .card.card_plain
      .works__wrapper
        .works__pic
          img(
            :src="imagePath"
          ).works__image
          .works__tag
            tags(
            :tags="tagsArray"
          )
        .works__data
          .works__title {{work.title}}
          .works__text
            p {{work.description}}
          a(:href=`work.link` target="_blank").works__link {{work.link}}
          .works__btns
            button(type="button" data-text="Править" @click="updateWork").btn.is-pencil
            button(type="button" data-text="Удалить" @click="removeExistedWork").btn.is-cross
</template>

<script>
import requests from "@/requests";
import { mapActions, mapMutations } from "vuex";
import { getAbsoluteImgPath } from "@/helpers/pictures";

export default {
  components: {
    tags: () => import("components/tags.vue"),
  },
  props: {
    work: Object
  },
  computed: {
    imagePath() {
      return getAbsoluteImgPath(this.work.photo);
    },
    tagsArray() {
      return this.work.techs.split(",");
    }
  },
  methods: {
    ...mapActions("works", ["removeWork"]),
    ...mapMutations("works", ["SET_CURRENT_WORK"]),
    updateWork() {
      this.SET_CURRENT_WORK(this.work.id);
      this.$emit("updateWork");
    },
    async removeExistedWork() {
      if (confirm("Удалить работу?") === false) return;
      try {
        const response = await this.removeWork(this.work.id);

      } catch (error) {
        //error
      }
    }
  }
};
</script>

