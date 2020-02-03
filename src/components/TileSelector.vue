<template>
    <div class="tile-selector">
        <font-awesome-icon icon="hand-pointer" size="xs" fixed-width @click="startSelection"/>
        <div v-if="selectedTile">
            {{selectedTile.name}}
        </div>
    </div>
</template>
<script>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name:'tile-selector'
})
export default class TileSelector extends Vue {
    @Prop({required:true}) overlay;
    selectedTile = false;
    selectedEvent = false;
    startSelection() {
        this.overlay.onmousedown = this.getTile
    }
    getTile(e) {
        let x = e.clientX
        let y = e.clientY
        let $gameMap = window.$gameMap;
        this.selectedTile = $gameMap.tileset($gameMap.tileId(parseInt(x/$gameMap.tileWidth()),parseInt(y/$gameMap.tileHeight()),0));
        this.selectedEvent = $gameMap.eventsXy(parseInt(x/$gameMap.tileWidth()),parseInt(y/$gameMap.tileHeight()));
        this.overlay.onmousedown = undefined;
    }
}
</script>
<style lang="scss">

</style>