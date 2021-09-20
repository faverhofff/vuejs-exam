<template>
  <div class="container">

    <div class="d-flex flex-column">
      <request-code-component :request-info="requestResult" class="order-1 order-sm-0" />
      <request-url-component :request-info="requestResult" :is-read-only="true" class="order-0 order-sm-1" />
    </div>      

    <table-resume-component :request-info="requestResult" />  

    <div class="flex-row justify-content-center">
      <share-request-component :request-info="requestResult" />
    </div>

    <div class="col-lg-12 d-sm-none1 d-md-none1 d-lg-none1 d-xl-none1">
      <button>View chart</button>      
    </div>

    <modal-component>      
      <template v-slot:modal-body>
      <h1>Hola mundo</h1>  
      </template>      
    </modal-component>


    <chart-component :request-info="requestResult" class="d-none" />

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { RequestResult } from '@/core/model/request-result.model';
import RequestCodeComponent from '@/components/request-code/request-code.component.vue';
import RequestUrlComponent from '@/components/request-url/request-url.component.vue';
import TableResumeComponent from '@/components/table-resume/table-resume.component.vue';
import ChartComponent from '@/components/chart/chart.component.vue';
import ShareRequestComponent from '@/components/share-request/share-request.component.vue';
import { requestService } from '@/core/services/request.service';
import ModalComponent from '../components/modal/modal.component.vue';

@Options({
  name: 'Query',
  components: {
    RequestCodeComponent,
    RequestUrlComponent,
    TableResumeComponent,
    ChartComponent,
    ShareRequestComponent,
    ModalComponent
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