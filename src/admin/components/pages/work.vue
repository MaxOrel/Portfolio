<template lang="pug">
	.works-section
		.container
			h1.page-title Блок «Работы»
		.works-container
			.container.container--mobile-wide
				add-new-work(
					v-if="showForm"
					:title="formTitle"
					:mode="mode"
					@cancel="showForm = false"
				)
				ul.works
					li.works__item
						add-new-btn(
							title='Добавить работу'
							@click="openAddingForm"
						)
					li.works__item(v-for="work in works")
						works-item(
							:work="work"
							@updateWork="updateWork"
						)
</template>


<script>
import { mapActions, mapState } from "vuex";
export default {

  components: {
    addNewBtn: () => import("components/add-new-btn.vue"),
    addNewWork: () => import("components/work-add-new.vue"),
    worksItem: () => import("components/works-item.vue")
  },
  data() {
    return {
      showForm: false,
      mode: "add"
    };
  },
  computed: {
    ...mapState("works", {
      works: state => state.works
    }),
		formTitle() {
      switch (this.mode) {
        case "edit":
          return "Редактирование работы";
        case "add":
          return "Добавление работы";
      }
    }
  },
  methods: {
    ...mapActions("works", ["fetchWorks"]),

    openAddingForm() {
      this.showForm = true;
      this.mode = "add";
    },
    async collectWorks() {
      try {
        await this.fetchWorks();
      } catch (error) {
				//error
      }
    },
    updateWork() {
      this.mode = "edit";
      this.showForm = true;
    }
  },
  created() {
    this.collectWorks();
  }
};
</script>