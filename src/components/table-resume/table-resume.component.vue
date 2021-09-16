<template>
    <div v-if="info != null" class="container horizontal-scrollable">
      <div class="row text-center flex-row card-deck mb-3 text-center">

        <div class="card mb-4 box-shadow">
          <ul class="list-unstyled mt-3 mb-4">
            <li>
              <section>domain</section>
              <section>{{ info?.data?.url?.domain }}</section>
            </li>
            <li>
              <section>scheme</section>
              <section>{{ info?.data?.url?.scheme }}</section>
            </li>
            <li>
              <section>scheme</section> 
              <section>{{ info?.data?.url?.path }}</section> 
            </li>
          </ul>
        </div>

        <div v-for="(response, index) in info?.data?.response" :key="index" class="card mb-4 box-shadow">
          <ul class="list-unstyled mt-3 mb-4">
            <li>
              <section>{{ response.http }}</section> 
              <section>{{ response.location }}</section> 
              <section v-if="response.server != null">{{ response.server }}</section> 
              <section v-if="response.date != null">{{ getFormattedDate(response.date) }}</section> 
            </li>
          </ul>
        </div>      
      </div>
    </div>
</template>

<script lang="ts">
import BaseComponent from '../base/base.component';

export default class TableResumeComponent extends BaseComponent {

  mounted() {
    console.log(this.info)
  }

  getFormattedDate(date: string): string {
    return (new Date(date)).toDateString();
  }

}
</script>

<style lang="scss" scoped>
  @import "table-resume.component.scss";
</style>