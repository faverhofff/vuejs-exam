<template>
    <!-- <div v-if="info != null" class="container horizontal-scrollable">
      <div class="row text-center flex-row card-deck mb-3 text-center">

        <div class="card mb-4 box-shadow url-info">
          <ul class="list-unstyled mt-3 mb-4">
            <li>
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

        <div v-for="(response, index) in info?.data?.response" :key="index" class="card mb-4 box-shadow response">
          <ul class="list-unstyled mt-3 mb-4">
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
      </div>
    </div> -->

<div class="scrolling-wrapper-flexbox">
  <div class="card col-lg-6">
    <div class="card mb-4 box-shadow url-info">
          <ul class="list-unstyled mt-3 mb-4">
            <li>
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
  </div>
  <div class="card col-lg-6" v-for="(response, index) in info?.data?.response" :key="index" >
    <div class="card mb-4 box-shadow response">
          <ul class="list-unstyled mt-3 mb-4">
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