<template>  

  <nav-component class="d-sm-none d-md-none d-lg-none d-xl-none">
    <template v-slot:body>
      <chart-component :request-info="requestResult"  />
    </template>
  </nav-component>

  <div class="container">

    <div class="d-flex flex-column py-2">
      <request-code-component :request-info="requestResult" class="order-1 order-sm-0" />
      <request-url-component 
        v-if="queryId == undefined" 
        v-on:on-request-done="emitRequestInfo" 
        class="order-0 order-sm-1" 
      />
      <request-url-component 
        v-if="queryId != undefined"
        :request-info="requestResult" 
        :is-read-only="true" 
        class="order-0 order-sm-1" 
      />
    </div>      

    <table-resume-component :request-info="requestResult" />

    <div class="flex-row justify-content-center">
      <share-request-component :request-info="requestResult" />
    </div>
    
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { RequestResult } from '@/core/model/request-result.model';
import RequestCodeComponent from '@/components/request-code/request-code.component.vue';
import RequestUrlComponent from '@/components/request-url/request-url.component.vue';
import TableResumeComponent from '@/components/table-resume/table-resume.component.vue';
import ShareRequestComponent from '@/components/share-request/share-request.component.vue';
import NavComponent from '@/components/nav/nav.component.vue';
import ChartComponent from '@/components/chart/chart.component.vue';
import { requestService } from '@/core/services/request.service';

@Options({
  name: 'Home',
  components: {
    NavComponent,
    RequestCodeComponent,
    RequestUrlComponent,
    TableResumeComponent,
    ShareRequestComponent,
    ChartComponent
  },
})
export default class App extends Vue {
  public requestResult: RequestResult | null = null;
  public queryId: string | null = null;

  public emitRequestInfo(info: RequestResult) {
    this.requestResult = info;  
  }

  mounted(): void {
    this.queryId = this.$route.params.query_id as string;
    if (!this.queryId) { 
      return
    }

    requestService.getSharedQuery(this.queryId)
      .then(r => this.requestResult = r.data);
  }
}
</script>