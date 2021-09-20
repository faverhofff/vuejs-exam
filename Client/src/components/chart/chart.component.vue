<template>
  <div class="row d-flex justify-content-center text-center chart-content">
    <div class="col-12">
      <h2>Timing Analysis</h2>
    </div>
    
    <div class="col-12 pb-2">&nbsp;</div>

    <div v-if="measure == undefined" class="row d-flex justify-content-center">
        <h4>There'n site requested</h4>
    </div>  

    <div v-if="measure != undefined" class="row d-flex justify-content-center">
      
      <div class="box" :style="{ 'linear-gradient': '(10deg,transparent 50%,#fff 0) top/100% 200%, radial-gradient(farthest-side at bottom,#fff calc(100% - 20px),transparent 0), linear-gradient(to right, green , yellow , red);' }" ></div>
      <div v-if="measure != undefined" class="justify-content-center box-info">
        <div>
          <h3>{{ measure?.pageLoadScore }}</h3>
          <h2>{{ message }}</h2>
        </div>
        <h1>Page Load</h1>
        <h1>{{ measure?.pageLoadTime }}s</h1>
      </div>

      <div class="col-12 pb-4">&nbsp;</div>

      <div class="box"></div>
      <div class="col-lg-6 text-center ratio-label first-interaction box-info">
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
