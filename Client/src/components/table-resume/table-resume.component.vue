<template>

  <div v-if="info != null" class="scrolling-wrapper-flexbox">
    <!-- begin:URL info -->
    <div class="card p-0 col-12 col-sm-4 box-shadow url-info box">
      <ul class="list-unstyled mb-4">
        <li class="">
          url info
        </li>
        <li>
          <span>domain</span>
          <span>{{ info?.data?.url?.domain }}</span>
        </li>
        <li>
          <span>scheme</span>
          <span>{{ info?.data?.url?.scheme }}</span>
        </li>
        <li>
          <span>scheme</span> 
          <span>{{ info?.data?.url?.path }}</span> 
        </li>
      </ul>
    </div>
    <!-- end:URL info -->
    
    <!-- begin:Response info -->
    <div class="card col-sm-4 p-0 col-12 box-shadow response" v-for="(response, index) in info?.data?.response" :key="index" >
      <ul class="list-unstyled mb-4">
        <li>response</li>
        <li>
          <section>{{ response.http }}</section> 
        </li>
        <li>
          <section>{{ response.location }}</section> 
        </li>
        <li >
          <section v-if="response.server != ''">{{ response.server }}</section> 
          <section v-if="response.date != ''">{{ getFormattedDate(response.date) }}</section> 
        </li>
      </ul>
    </div>
    <!-- end:Response info -->
  
  </div>
</template>

<script lang="ts">
import BaseComponent from '../base/base.component';

export default class TableResumeComponent extends BaseComponent {

  getFormattedDate(date: string): string {
    return (new Date(date)).toDateString();
  }

}
</script>

<style lang="scss" scoped>
  @import "table-resume.component.scss";
</style>