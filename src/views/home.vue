<template>
  <div class="container">

    <header>
      <request-code-component :request-info="requestResult" />
      <request-url-component v-on:on-request-done="emitRequestInfo" />
      <request-code-component :request-info="requestResult" />
    </header>      

    <table-resume-component :request-info="requestResult" />

    <div class="row">

      <div class="flex-row justify-content-center">
          <share-request-component :request-info="requestResult" />
      </div>

      <div class="col-lg-12">
        <chart-component :request-info="requestResult" />
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { RequestResult } from '@/model/request-result.model';
import RequestCodeComponent from '@/components/request-code/request-code.component.vue';
import RequestUrlComponent from '@/components/request-url/request-url.component.vue';
import TableResumeComponent from '@/components/table-resume/table-resume.component.vue';
import ChartComponent from '@/components/chart/chart.component.vue';
import ShareRequestComponent from '@/components/share-request/share-request.component.vue';

@Options({
  components: {
    RequestCodeComponent,
    RequestUrlComponent,
    TableResumeComponent,
    ChartComponent,
    ShareRequestComponent
  },
})
export default class App extends Vue {
  public requestResult: RequestResult | null = null;

  public emitRequestInfo(info: RequestResult) {
    this.requestResult = info;  
  }
}
</script>

<style lang="scss" scoped>
/*
*,::after,::before{
  box-sizing:border-box;
  }
.card{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;border:1px solid rgba(0,0,0,.125);border-radius:.25rem;}
.card-body{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;padding:1.25rem;}
.card-title{margin-bottom:.75rem;}
.card-header{padding:.75rem 1.25rem;margin-bottom:0;background-color:rgba(0,0,0,.03);border-bottom:1px solid rgba(0,0,0,.125);}
.card-header:first-child{border-radius:calc(.25rem - 1px) calc(.25rem - 1px) 0 0;}
.card-deck{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;}
.card-deck .card{margin-bottom:15px;}
@media (min-width:576px){
.card-deck{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;margin-right:-15px;margin-left:-15px;}
.card-deck .card{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1 0 0%;flex:1 0 0%;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-right:15px;margin-bottom:0;margin-left:15px;}
}
@media print{
*,::after,::before{text-shadow:none!important;box-shadow:none!important;}
}
*/
</style>