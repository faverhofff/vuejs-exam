<template>
  <!-- begin: Code result header-->
  <div class="col-lg-12 request-code-result px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
    <h1 v-if="info != undefined" class="display-4">{{ info?.data?.response[0].statusCode }}</h1>
    <p v-if="info != undefined" class="lead">{{ MessagebyStatusCode[info?.data?.response[0].statusCode] }}</p>
  </div>
  <!-- end: Code result header-->
</template>

<script lang="ts">
import BaseComponent from '../base/base.component';

export default class RequestCodeComponent extends BaseComponent {
   get getStatusCode(): string | undefined {
     return this.info?.data?.response[0].statusCode;
   }

  public readonly MessagebyStatusCode = {
      '200': 'Everything is fine!', 
      '404': 'Error loading',
      '400': 'Not found'
  }

}
</script>

<style lang="scss" scoped>
  @import 'request-code.component.scss';
</style>
