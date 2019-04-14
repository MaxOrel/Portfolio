import Vue from "vue";
import axios from "axios";

const skill = {
  template: "#skill",
  props: {
    skillName: String,
    skillPercents: Number
  },
  methods: {
    drawCircle() {
      const circle = this.$refs["color-circle"];
      const dashArray = parseInt(
        getComputedStyle(circle).getPropertyValue("stroke-dasharray")
      );
      const percent = (dashArray / 100) * (100 - this.skillPercents);

      circle.style.strokeDashoffset = percent;
    }
  },
  mounted() {
    this.drawCircle();
  }
};

const skillsRow = {
  template: "#skills-row",
  components: {
    skill
  },
  props: {
    skillRowObject: Object
  }
};

new Vue({
  el: "#skills-component",
  template: "#skills-list",

  data: {
    skillsGroup:{},
    skillsList:{},
    skillsData: {}

  },
  components: {
    skillsRow 
  },
  created() {
    const skillGroup = axios.get("https://webdev-api.loftschool.com/categories/109")
            .then(response => {
              console.log(response)
            });
    const skillList = axios.get("https://webdev-api.loftschool.com/skills/109")
            .then(response => {
              console.log(response)
            });        
    const data = require("../data/skills.json");
    this.skillsGroup = skillGroup.data;
    this.skillsList= skillList.data;
    
    this.skillsData = data;
  }
});
