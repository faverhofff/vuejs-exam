<template>
  <div v-if="this.info != null">
    <div class="text-center text-uppercase font-weight-bold col-12">
      Share
    </div>
    <div class="text-center">
      <div><a :href="sharedId" class="bg-info text-white rounded-pill">{{sharedId}}</a></div>
    </div>
  </div>  
</template>

<script lang="ts">
import { LocalUrl } from '@/core/const/api'
import BaseComponent from '../base/base.component';

export default class ShareRequestComponent extends BaseComponent {
  get sharedId(): string | undefined {
    return `${LocalUrl}/${this.info?.data?.request?.id}`;
  }
}
</script>