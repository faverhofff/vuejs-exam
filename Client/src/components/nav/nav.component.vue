<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" @click="show=!show">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div :class="['collapse navbar-collapse bg-dark', (show ? 'show' : '')]" id="navbarCollapse">
            <slot name="body">
              
            </slot>
        </div>
    </nav>
</template>

<script lang="ts">
import BaseComponent from "@/components/base/base.component";

export default class NavComponent extends BaseComponent {
    public show: boolean = false;
}
</script>

<style lang="scss" scoped>
  @import 'nav.component.scss';
</style>
