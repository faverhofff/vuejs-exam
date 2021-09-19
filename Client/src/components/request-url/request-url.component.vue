<template>
  <div class="d-flex justify-content-center pb-4">

      <form id="form" v-on:submit.prevent=""
        :class="[!isValidUrl() && url.length > 0 ? 'is-invalid-url' : '', 'card card-sm bg-light']">
        <div class="card-body p-2 row no-gutters align-items-center">
          <!-- begin: Dropdown METHODS menu-->
          <div class="col-auto">
            <div class="dropdown-method show">
              <button
                :disabled="isReadOnly"
                id="dropdown-menu"
                class="btn btn-secondary dropdown-toggle bg-button text-white"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ getCurrentMethod }}
              </button>
              <div v-if="!isReadOnly" class="dropdown-menu" aria-labelledby="dropdown-menu">
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
              v-if="!isReadOnly"
              v-model="url"
              v-on:keyup="onKeySubmit"
              class="form-control form-control-lg form-control-borderless" 
              type="text"
              placeholder="example: https://example.com"
              required
            />
            <input
              :value="getUrl"
              v-if="isReadOnly"
              v-on:keyup="onKeySubmit"
              readonly
              class="form-control form-control-lg form-control-borderless" 
              type="text"
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
import { Prop } from 'vue-property-decorator';
import { AvailableMethodsArray } from '@/core/const/methods'
import { requestService } from '@/core/services/request.service'
import { ValidateUrl } from '@/core/util/url.validation';
import BaseComponent from '../base/base.component';

export default class RequestUrlComponent extends BaseComponent {
  @Prop() public onRequestDone!: RequestResult;
  @Prop() public isReadOnly = false;

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
  onKeySubmit(e: any): void {
    if (this.isValidUrl() && e.keyCode === 13) {
      this.getRequest();
    }
  }

  /**
   * 
   */
  get getUrl(): string {
    return this.info == undefined ? '' :
           `${this.info?.data?.url?.scheme}://${this.info?.data?.url?.domain}/${this.info?.data?.url?.path}`;
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
