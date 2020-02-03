<template>
    <div class="overlay" ref="overlay">
        <container v-for="(container,index) in containers" :key="index" :container="container" :index="index" :overlay="$refs.overlay"></container>
    </div>
</template>
<script>
import { Vue, Component } from 'vue-property-decorator'
import {
  State,
  Mutation
} from 'vuex-class'
import Container from './Container.vue'
import store from '../store'

@Component({
    store,
    components: {
        Container
    }
})
export default class DeveloperOverlay extends Vue {
    @State('containers') containers;
    @State('editingMode') editingMode;
    @Mutation('SET_CONTAINERS') setContainers
    @Mutation('SET_EDITING_MODE') setEditingMode
    mounted() {
        this.setContainers(window.$overlay.containers || []);
        document.addEventListener('keydown', (e) => {
            if (e.code == 'Space') {
                this.setEditingMode(!this.editingMode)
            }
        });
    }
}
</script>
<style lang="scss">
    @import '../assets/scss/styles.scss';
    .overlay {
        width:100%;
        height:100%;
    }
</style>