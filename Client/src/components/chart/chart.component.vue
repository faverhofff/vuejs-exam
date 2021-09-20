<template>
  <div class="row d-flex justify-content-center text-center chart-content">
    <div class="col-12">
      <h2>Timing Analysis</h2>
    </div>
    
    <div class="row d-flex justify-content-center">
      <div class="col-lg-6 text-center ratio-label">
        <div>
          <h3>{{ measure?.pageLoadScore }}</h3>
          <h2>{{ message }}</h2>
        </div>
        <h1>Page Load</h1>
        <h1>{{ measure?.pageLoadTime }}s</h1>
      </div>

      <div class="col-lg-6 text-center ratio-label">
        <div>
          <h3>{{ measure?.firstInteractionScore }}</h3>
          <h2>{{ message }}</h2>
        </div>
        <h1>First Interaction</h1>
        <h1>{{ measure?.firstInteractionTime }}s</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ChronosModel } from '@/core/model/chronos.model';
import { requestService } from '@/core/services/request.service';
import BaseComponent from '../base/base.component';

export default class ChartComponent extends BaseComponent {
  public measure!: ChronosModel;
  protected readonly message = "Great!"  

  mounted(): void {
    requestService
      .getChronosInfo()
      .then((m: any) => this.measure = m.data);
  }
}
</script>

<style lang="scss" scoped>
  @import 'chart.component.scss';
</style>
