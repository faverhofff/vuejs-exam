<template>
  <div class="justify-content-center text-center col-lg-12">
    <div class="col-12">
      <form id="form" class="card card-sm bg-light">
        <div class="card-body row no-gutters align-items-center">
          <!-- begin: Dropdown METHODS menu-->
          <div class="col-auto">
            <div class="dropdown-method show">
              <button
                id="dropdown-menu"
                class="btn btn-secondary dropdown-toggle bg-dark text-white"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ getCurrentMethod }}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdown-menu">
                <a
                  v-for="(method, index) in availableMethods"
                  :key="index"
                  class="dropdown-item"
                  href="#"
                  @mousedown="setMethod(index)"
                  >{{ method }}</a
                >
              </div>
            </div>
          </div>
          <!-- end: Dropdown METHODS menu-->

          <div class="col bg-light">
            <input
              v-model="url"
              class="form-control form-control-lg form-control-borderless bg-light" 
              type="text"
              placeholder="example: https://example.com"
              required
            />
          </div>

          <div class="col-auto">
            <button 
              :disabled="!isValidUrl()" 
              @click="getRequest()" 
              class="btn btn-lg btn-primary cursor-pointer" 
              type="button">
                <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
      <div v-if="!isValidUrl() && url != '' && url != null" class="alert alert-danger">
        <div v-if="url == ''">URL is required.</div>
        <div v-if="url != '' && url != null && !isValidUrl()">Please enter valid url.</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RequestResult } from '../../model/request-result.model';
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { AvailableMethodsArray } from '@/core/const/methods'
import { requestService } from '@/core/services/request.service'
export default class RequestUrlComponent extends Vue {
  @Prop() public onRequestDone!: RequestResult;
  @Prop() public readOnly = false;

  public url: string | null = 'https://urufarma.com.uy/terfin/';
  protected currentMethod = 0;
  public availableMethods = AvailableMethodsArray;

  getRequest(): void {
    requestService
      .call(this.getCurrentMethod, this.url as any)
      .then((result: any) => {
        this.$emit('onRequestDone', result.data);
      })
  }

  isValidUrl(): boolean {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        
    return RegExp(pattern).test(this.url as any);
  }

  /**
   *
   * @param method
   */
  setMethod(method: number): void {
    this.currentMethod = method;
  }

  /**
   *
   */
  get getCurrentMethod(): string {
    return this.availableMethods[this.currentMethod].toString();
  }
}
</script>

<style lang="scss" scoped>
@import 'request-url.component.scss';
</style>
