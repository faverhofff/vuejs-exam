<template>
  <div class="container">

    <!-- <div class="row">
      <request-code-component :request-info="requestResult" class="d-none d-md-block" />
      <request-url-component v-on:on-request-done="emitRequestInfo"  />
      <request-code-component :request-info="requestResult" class="d-block d-md-none" />
    </div>       -->

    <div class="d-flex flex-column">
      <request-code-component :request-info="requestResult" class="order-1 order-sm-0" />
      <request-url-component v-on:on-request-done="emitRequestInfo" class="order-0 order-sm-1" />
    </div>      

    <!-- <div class="row"><hr></div> -->

    <table-resume-component :request-info="requestResult" />

    <!-- <div class="row"><hr></div> -->

    <div class="flex-row justify-content-center">
        <share-request-component :request-info="requestResult" />
    </div>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { RequestResult } from '@/model/request-result.model';
import RequestCodeComponent from '@/components/request-code/request-code.component.vue';
import RequestUrlComponent from '@/components/request-url/request-url.component.vue';
import TableResumeComponent from '@/components/table-resume/table-resume.component.vue';
import ShareRequestComponent from '@/components/share-request/share-request.component.vue';

@Options({
  name: 'Home',
  components: {
    RequestCodeComponent,
    RequestUrlComponent,
    TableResumeComponent,
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