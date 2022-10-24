<template>
  <transition name="modal-fade">
    <div class="modal-overlay">
      <div class="bg-light custom">
        <div class="d-flex justify-content-between align-items-center px-2">
          <p class="">Create Record</p>
          <button class="btn" @click="$emit('close-modal')">
            <i
              class="fa fa-times fa-lg text-danger icon"
              aria-hidden="true"
            ></i>
          </button>
        </div>
        <div class="formItem">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="Username"
              aria-describedby="emailHelp"
              placeholder=" Name"
              v-model="full_name"
            />
          </div>
          <div class="mb-3">
            <input
              type="number"
              class="form-control"
              id="age"
              placeholder="Age"
              v-model="age"
            />
          </div>
          <div class="mb-3">
            <select
              v-model="blood_group"
              class="form-select"
              aria-label="Default select example"
            >
              <option selected>Blood Group</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="O">O</option>
              <option value="AB">AB</option>
            </select>
          </div>

          <div class="d-flex justify-content-end">
            <button class="mx-1 btn btn-outline-info">
              <i class="fa fa-long-arrow-left mx-2 xs" aria-hidden="true"></i>
              Cancel
            </button>
            <button @click="submit" class="btn btn-primary">
              <i class="fa fa-database mx-2 xs" aria-hidden="true"></i> Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
export default {
  name: "AddRecordModal",
  props: {
    record: Object,
  },
  data() {
    return {
      full_name: "",
      age: "",
      blood_group: "",
    };
  },
  methods: {
    handleClose() {
      this.$emit("close-modal");
    },
    submit() {
      addDoc(collection(db, "ehealth"), {
        name: this.full_name,
        age: this.age,
        blood_group: this.blood_group,
      });
      this.$emit("refresh");

      this.handleClose();
    },
    loadData() {
      this.full_name = this.record.name;
      this.age = this.record.age;
      this.blood_group = this.record.blood_group;
    },
  },
  created() {
    if (this.operation === "update") {
      this.loadData();
    }
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
}
.custom {
  height: 350px;
  width: 400px;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.btn-color {
  background-color: #0e1c36;
  color: #fff;
}
.formItem {
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  align-items: center;
}
.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}
.close-img {
  width: 25px;
}
.check {
  width: 150px;
}
h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}
p {
  font-size: 16px;
  margin: 20px 0;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
