<template>
  <div id="nav">
    <Navbar />
    <!-- <StatisticsView />
    <TableView /> -->
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import StatisticsView from "./components/Statistics.vue";
import TableView from "./components/Table.vue";
export default {
  components: {
    Navbar,
    StatisticsView,
    TableView,
  },
};
</script>
<style lang=""></style>
