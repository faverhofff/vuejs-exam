<template>
  <div v-if="this.info != null">
    <div class="text-center text-uppercase font-weight-bold">
      Share
    </div>
    <div class="bg-light">
      <a :href="sharedId">{{sharedId}}</a>
    </div>
  </div>  
</template>

<script lang="ts">
import { ApiBaseUrl } from '@/core/const/api'
import BaseComponent from '../base/base.component';

export default class ShareRequestComponent extends BaseComponent {
  get sharedId(): string {
    return `${ApiBaseUrl}/${this.info?.data?.data?.request?.id}`;
  }
}
</script>

<style lang="scss" scoped>
  @import 'share-request.component.scss';
</style>
