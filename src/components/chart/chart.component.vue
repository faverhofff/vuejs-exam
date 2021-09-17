<template>
  <div class="row d-flex justify-content-center text-center">
    <div class="col-12">
    <h2>Timing Analysis</h2>
    </div>
    
    <div class="row d-flex justify-content-center">
      <div class="col-lg-6 text-center ratio-label">
        <div>
          <h3>720</h3>
          <h2>Great!</h2>
        </div>
        <h1>Page Load</h1>
        <h1>0.4s</h1>
      </div>

      <div class="col-lg-6 text-center ratio-label">
        <div>
          <h3>720</h3>
          <h2>Great!</h2>
        </div>
        <h1>First Interaction</h1>
        <h1>0.9s</h1>
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
