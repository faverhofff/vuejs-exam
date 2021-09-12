<template>
  <h4>Timing Analysis</h4>

  <ul class="chart-skills">
    <li>
      <span>600</span>
    </li>
    <li>
      <span>700</span>
    </li>
    <li>
      <span>800</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { RequestResult } from '../../model/request-result.model';

export default class ChartAnalyticComponent extends Vue {
  @Prop() RequestInfo!: RequestResult;
}
</script>

<style lang="scss" scoped>
@import 'chart-analytic.component.scss';
</style>
