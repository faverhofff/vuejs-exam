<template>

    <div class="container">
      <div class="card-deck mb-3 text-center">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">url info</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>
                <span>domain</span> 
                <span>{{ RequestInfo?.data?.url?.domain }}</span> 
              </li>
              <li>
                <span>scheme</span> 
                <span>{{ RequestInfo?.data?.url?.scheme }}</span> 
              </li>
              <li>
                <span>scheme</span> 
                <span>{{ RequestInfo?.data?.url?.path }}</span> 
              </li>
            </ul>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">response</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>
                <span>{{ RequestInfo?.data?.response?.http }}</span> 
                <span>{{ RequestInfo?.data?.response?.location }}</span> 
                <span>{{ RequestInfo?.data?.response?.server }}</span> 
              </li>
            </ul>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">response</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>
                <span>{{ RequestInfo?.data?.response?.http }}</span> 
                <span>{{ RequestInfo?.data?.response?.location }}</span> 
                <span>{{ RequestInfo?.data?.response?.server }}</span> 
              </li>
            </ul>
          </div>
        </div>
      </div>

    
    </div>


</template>
<script lang="ts">
import { RequestResult } from "@/model/request-result.model";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class TableResumeAnalyticComponent extends Vue {
  @Prop() RequestInfo!: RequestResult;
}
</script>