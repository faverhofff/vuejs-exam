<template>
  <!-- begin: Code result header-->
  <div class="col-lg-12 request-code-result px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
    {{RequestInfo?.response?.statusCode}}
    <h1 class="display-4">{{ RequestInfo?.response?.statusCode }}</h1>
    <p v-if="RequestInfo != null" class="lead">{{ MessagebyStatusCode[RequestInfo.response.statusCode] }}</p>
  </div>
  <!-- end: Code result header-->
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { RequestResult } from '../../model/request-result.model';

export default class RequestCodeComponent extends Vue {
  @Prop() public RequestInfo!: RequestResult; 

  @Watch('prop')
  onPropertyChanged(value: RequestResult) {
    console.log(value);
    this.RequestInfo = value
  }

  data(){
    return {
      prop: this.RequestInfo
    }
  }

  public readonly MessagebyStatusCode = {
      '200': 'Everything is fine!', 
      '404': 'Error loading'
  }
}
</script>

<style lang="scss" scoped>
@import 'request-code.component.scss';
</style>
