<template>
  <div class="row d-flex justify-content-center">
    <div class="col-12">
    <h2>Timing Analysis</h2>
    </div>
    
    <div class="row d-flex justify-content-center">
      <div class="col-lg-6 text-center page_load">
        <img src="../../assets/chrono.png" alt="">
        <h2>Page Load</h2>
      </div>

      <div class="col-lg-6 text-center first_interaction">
        <img src="../../assets/chrono.png" alt="">
        <h2>First Interaction</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseComponent from '../base/base.component';

export default class ChartComponent extends BaseComponent {}
</script>

<style lang="scss" scoped>
  @import 'chart.component.scss';
</style>
