<template>
  <div class="d-flex flex-column wrapper">
    <div class="d-flex align-items-center">
      <span :class="[onLine === true ? 'dot-success' : 'dot-danger']"></span>
      <span
        class="px-1"
        :class="[onLine === true ? 'text-success' : 'text-danger']"
        >{{ onLine === true ? "online" : "offline" }}</span
      >
    </div>
    <div v-if="medicalRecords.length > 0" class="stats">
      <StatisticsView :medicalRecords="medicalRecords" />
    </div>
    <div v-if="medicalRecords.length > 0" class="tableContent">
      <TableView
        :medicalRecords="medicalRecords"
        :fetchRecords="fetchRecords"
        :onLine="onLine"
      />
    </div>
  </div>
</template>
<script>
import TableView from "../components/Table.vue";
import StatisticsView from "../components/Statistics.vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: "HomeView",
  components: {
    TableView,
    StatisticsView,
  },
  data() {
    return {
      onLine: navigator.onLine,
      showBackOnline: false,
      medicalRecords: [],
    };
  },
  methods: {
    fetchRecords() {
      console.log("called");
      this.medicalRecords = [];

      if (this.onLine === true) {
        onSnapshot(collection(db, "ehealth"), (querySnapshot) => {
          const records = [];
          querySnapshot.forEach((doc) => {
            const record = {
              id: doc.id,
              name: doc.data().name,
              age: doc.data().age,
              blood_group: doc.data().blood_group,
            };
            records.push(record);
          });
          localStorage.setItem("ehealth", JSON.stringify(records));
          this.medicalRecords = records;
        });
      } else {
        const ehealthRecords = localStorage.getItem("ehealth");
        this.medicalRecords = JSON.parse(ehealthRecords);
      }
    },
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    },
  },
  watch: {
    onLine(v) {
      if (v) {
        this.showBackOnline = true;
        setTimeout(() => {
          this.showBackOnline = false;
        }, 1000);
      }
    },
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
    this.fetchRecords();
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
};
</script>
<style scoped>
.wrapper {
  min-height: 150vh;
}
.stats {
  height: 50vh;
}
.tableContent {
  margin-top: 100px;
}
.dot-success {
  height: 8px;
  width: 8px;
  background-color: green;
  border-radius: 50%;
  margin-top: 5px;
}
.dot-danger {
  height: 8px;
  width: 8px;
  background-color: red;
  border-radius: 50%;
  margin-top: 5px;
}
</style>
