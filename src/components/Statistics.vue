<template>
  <div class="py-2 container-fluid wrapper">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>
<script>
import { Chart } from "highcharts-vue";
export default {
  name: "StatisticsView",
  props: { medicalRecords: Array },
  components: {
    highcharts: Chart,
  },

  data() {
    return {
      chartOptions: {
        chart: {
          type: "column",
        },

        title: {
          text: "Age and Blood group distribution",
        },

        xAxis: {
          categories: ["0 - 2", "3 - 18", "19 - 39", "40 - 59", "60 - 99"],
          crosshair: true,
        },
        yAxis: {
          title: {
            useHTML: true,
            text: "Total number",
          },
          stackLabels: {
            enabled: true,
            verticalAlign: "bottom",
            crop: false,
            overflow: "none",
            y: 20,
            formatter: function () {
              return this.stack;
            },
            style: {
              fontSize: "9px",
            },
          },
        },

        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
          series: {
            pointPadding: 0.4,
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "{point.y}",
            },
          },
        },
        series: [
          {
            name: "Blood Group A",
            data: [],
          },
          {
            name: "Blood Group B",
            data: [],
          },
          {
            name: "Blood Group AB",
            data: [],
          },
          {
            name: "Blood Group O",
            data: [],
          },
        ],
      },
      bloodGroupA: [],
      bloodGroupB: [],
      bloodGroupAB: [],
      bloodGroupO: [],

      newBloodA: {
        oneTo2: [],
        threeTo18: [],
        ninTo39: [],
        fotyTo59: [],
        sixtyTo200: [],
      },
      newBloodB: {
        oneTo2: [],
        threeTo18: [],
        ninTo39: [],
        fotyTo59: [],
        sixtyTo200: [],
      },
      newBloodAB: {
        oneTo2: [],
        threeTo18: [],
        ninTo39: [],
        fotyTo59: [],
        sixtyTo200: [],
      },
      newBloodO: {
        oneTo2: [],
        threeTo18: [],
        ninTo39: [],
        fotyTo59: [],
        sixtyTo200: [],
      },
    };
  },
  methods: {
    structureChart() {
      this.medicalRecords.forEach((item) => {
        if (item.blood_group === "A") {
          this.bloodGroupA.push(item);
        } else if (item.blood_group === "B") {
          this.bloodGroupB.push(item);
        } else if (item.blood_group === "AB") {
          this.bloodGroupAB.push(item);
        } else {
          this.bloodGroupO.push(item);
        }
      });

      let tempA = [];
      this.bloodGroupA.forEach((item) => {
        if (item.age <= 2) {
          this.newBloodA.oneTo2.push(item);
        } else if (item.age > 2 && item.age <= 18) {
          this.newBloodA.threeTo18.push(item);
        } else if (item.age > 18 && item.age <= 39) {
          this.newBloodA.ninTo39.push(item);
        } else if (item.age > 39 && item.age <= 59) {
          this.newBloodA.fotyTo59.push(item);
        } else {
          this.newBloodA.sixtyTo200.push(item);
        }
      });

      for (const [key, value] of Object.entries(this.newBloodA)) {
        tempA.push(value.length);
      }

      let tempB = [];
      this.bloodGroupB.forEach((item) => {
        if (item.age <= 2) {
          this.newBloodB.oneTo2.push(item);
        } else if (item.age > 2 && item.age <= 18) {
          this.newBloodB.threeTo18.push(item);
        } else if (item.age > 18 && item.age <= 39) {
          this.newBloodB.ninTo39.push(item);
        } else if (item.age > 39 && item.age <= 59) {
          this.newBloodB.fotyTo59.push(item);
        } else {
          this.newBloodB.sixtyTo200.push(item);
        }
      });

      for (const [key, value] of Object.entries(this.newBloodB)) {
        tempB.push(value.length);
      }

      let tempAB = [];
      this.bloodGroupAB.forEach((item) => {
        if (item.age <= 2) {
          this.newBloodAB.oneTo2.push(item);
        } else if (item.age > 2 && item.age <= 18) {
          this.newBloodAB.threeTo18.push(item);
        } else if (item.age > 18 && item.age <= 39) {
          this.newBloodAB.ninTo39.push(item);
        } else if (item.age > 39 && item.age <= 59) {
          this.newBloodAB.fotyTo59.push(item);
        } else {
          this.newBloodAB.sixtyTo200.push(item);
        }
      });

      for (const [key, value] of Object.entries(this.newBloodAB)) {
        tempAB.push(value.length);
      }

      let tempO = [];

      this.bloodGroupO.forEach((item) => {
        if (item.age <= 2) {
          this.newBloodO.oneTo2.push(item);
        } else if (item.age > 2 && item.age <= 18) {
          this.newBloodO.threeTo18.push(item);
        } else if (item.age > 18 && item.age <= 39) {
          this.newBloodO.ninTo39.push(item);
        } else if (item.age > 39 && item.age <= 59) {
          this.newBloodO.fotyTo59.push(item);
        } else {
          this.newBloodO.sixtyTo200.push(item);
        }
      });

      for (const [key, value] of Object.entries(this.newBloodO)) {
        tempO.push(value.length);
      }

      this.chartOptions.series[0].data = tempA;
      this.chartOptions.series[1].data = tempB;
      this.chartOptions.series[2].data = tempAB;
      this.chartOptions.series[3].data = tempO;
    },
  },
  mounted() {
    this.structureChart();
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
