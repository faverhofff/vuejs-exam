<template>
  <div class="d-flex justify-content-center pb-4">
    
      <form id="form" class="card card-sm bg-light">
        <div class="card-body p-2 row no-gutters align-items-center">
          <!-- begin: Dropdown METHODS menu-->
          <div class="col-auto">
            <div class="dropdown-method show">
              <button
                :disabled="readOnly"
                id="dropdown-menu"
                class="btn btn-secondary dropdown-toggle bg-button text-white"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ getCurrentMethod }}
              </button>
              <div v-if="!readOnly" class="dropdown-menu" aria-labelledby="dropdown-menu">
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

          <div class="col">
            <input
              v-model="url"
              class="form-control form-control-lg form-control-borderless" 
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
  </div>
</template>

<script lang="ts">
import { RequestResult } from '@/core/model/request-result.model';
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { AvailableMethodsArray } from '@/core/const/methods'
import { requestService } from '@/core/services/request.service'
import { ValidateUrl } from '@/core/util/url.validation';

export default class RequestUrlComponent extends Vue {
  @Prop() public onRequestDone!: RequestResult;
  @Prop() public query!: RequestResult;
  @Prop() public readOnly = false;

  public url: string = ''; 
  protected currentMethod = 0;
  public availableMethods = AvailableMethodsArray;

  /**
   * 
   */
  getRequest(): void {
    requestService
      .call(this.getCurrentMethod, this.url as any)
      .then((result: any) => {
        this.$emit('onRequestDone', result.data);
      })
  }
 
  /**
   * 
   */
  isValidUrl(): boolean {
    return ValidateUrl(this.url);
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
