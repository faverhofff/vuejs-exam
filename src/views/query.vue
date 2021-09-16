<template>
  <div class="container">

    <div class="row">
      <request-code-component :request-info="requestResult" />
      <request-url-component :query="requestResult" :read-only="true" />
      <request-code-component :request-info="requestResult" />
    </div>      

    <div class="scroll">
      <table-resume-component :request-info="requestResult" />
    </div>

    <div class="row"><hr></div>

    <div class="flex-row justify-content-center">
      <share-request-component :request-info="requestResult" />
    </div>

    <div class="row"><hr></div>
    
    <div class="col-lg-12">
      <chart-component :request-info="requestResult" />
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
import { requestService } from '@/core/services/request.service';

@Options({
  name: 'Query',
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

  mounted(): void {
      let id = this.$route.params.query_id as string;
      requestService.getSharedQuery(id)
        .then(r => this.requestResult = r.data);
  }

}
</script>