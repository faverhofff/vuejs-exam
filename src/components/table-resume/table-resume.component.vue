<template>
  <div v-if="info != null" class="container">      
    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 box-shadow">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">url info</h4>
        </div>
        <div class="card-body">
          <ul class="list-unstyled mt-3 mb-4">
            <li>
              <section>domain</section>
              <section>{{ info?.data?.data?.url?.domain }}</section>
            </li>
            <li>
              <section>scheme</section>
              <section>{{ info?.data?.data?.url?.scheme }}</section>
            </li>
            <li>
              <section>scheme</section> 
              <section>{{ info?.data?.data?.url?.path }}</section> 
            </li>
          </ul>
        </div>
      </div>
      <div v-for="(response, index) in info?.data?.data?.response" :key="index" class="card mb-4 box-shadow">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">response</h4>
        </div>
        <div class="card-body">
          <ul class="list-unstyled mt-3 mb-4">
            <li>
              <section>{{ response.http }}</section> 
              <section>{{ response.location }}</section> 
              <section v-if="response.server">{{ response.server }}</section> 
              <section v-if="response.date">{{ response.date }}</section> 
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseComponent from '../base/base.component';

export default class TableResumeComponent extends BaseComponent {

}
</script>