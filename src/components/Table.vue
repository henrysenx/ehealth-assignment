<template>
  <div class="card my-7">
    <div class="card-header py-3">
      <div class="row">
        <div class="col-lg-6 col-7">
          <h6>Projects</h6>
        </div>
        <div class="col-lg-6 col-5 my-auto text-end">
          <div class="dropdown float-lg-end pe-4">
            <button
              v-if="onLine === true"
              @click="showModal = true"
              class="btn btn-primary"
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
              Add Record
            </button>
          </div>
        </div>
      </div>
      <div class="card-body px-0 pb-2">
        <table
          class="table table-striped table-hover rounded rounded-3 overflow-auto"
        >
          <thead
            class="bg-success text-white rounded-top overflow-hidden rounded-3"
          >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Blood Group</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in medicalRecords" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ record.name }}</td>
              <td>{{ record.age }}</td>
              <td>{{ record.blood_group }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <AddRecordModal
    v-if="showModal"
    @close-modal="showModal = false"
    operation="create"
    @refresh="refresh"
  />
</template>
<script>
import AddRecordModal from "../components/AddRecordModal.vue";

export default {
  name: "TableView",
  components: { AddRecordModal },
  props: {
    medicalRecords: Array,
    fetchRecords: Function,
    onLine: String,
  },
  data() {
    return {
      showModal: false,
      record: null,
    };
  },
  methods: {
    refresh() {
      this.fetchRecords();
    },
  },
};
</script>
<style lang=""></style>
