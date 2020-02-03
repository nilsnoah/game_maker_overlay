<template>
    <div class="container" @dragover="event=>event.preventDefault()" @drop="draggableDropped(index)" ref="container">
        <div class="container__head">
            <h2 v-if="!editingName" class="title">{{container.name}} <font-awesome-icon v-if="editingMode" icon="edit" size="xs" fixed-width @click="editingName = true"/></h2>
            <input v-if="editingName" type="text" :placeholder="container.name" @change="updateName">
            <div class="tabs">
                <span v-for="(tab,name) in container.tabs" :key="name" class="tab" :draggable="editingMode" @dragstart="startDragging({type:'tab',data:{tab,name}})" @click="setCurrentTab({index,tab})">{{name}}</span>
            </div>
        </div>
        <div class="container__body" v-if="container.currentTab">
            <component v-for="(component,index) in container.currentTab.components" :key="index" :is="component.name" :data="component.data" :overlay="overlay"></component>
        </div>
        <div class="editing-buttons" v-if="editingMode">
            <div class="container-position"><font-awesome-icon icon="arrows-alt" size="xs" fixed-width @mousedown="event=>setMouseDown('position',event)"/></div>
            <div class="container-width"><font-awesome-icon icon="arrows-alt-h" size="xs" fixed-width @mousedown="event=>setMouseDown('width',event)"/></div>
            <div class="container-height"><font-awesome-icon icon="arrows-alt-h" rotation="90" size="xs" fixed-width @mousedown="event=>setMouseDown('height',event)"/></div>
            <div class="container-size"><font-awesome-icon icon="arrows-alt-h" :transform="{ rotate: 45 }" size="xs" fixed-width @mousedown="event=>setMouseDown('size',event)"/></div>
        </div>
    </div>
</template>
<script>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import {
  Mutation, State, Action
} from 'vuex-class'
import DatabaseList from './DatabaseList.vue'
import TileSelector from './TileSelector.vue'

@Component({
    components: {
        DatabaseList,
        TileSelector
    }
})
export default class Container extends Vue {
    @State('editingMode') editingMode;
    @Mutation('SET_CURRENT_TAB') setCurrentTab;
    @Mutation('SET_CONTAINER_STYLE') setContainerStyle;
    @Mutation('SET_CONTAINER_NAME') setContainerName;
    @Action('startDragging') startDragging;
    @Action('draggableDropped') draggableDropped;
    @Prop({required:true}) container;
    @Prop({required:true}) index;
    @Prop({required:true}) overlay;
    @Watch('editingMode') 
    updateStyle() {
            let style = {...this.container.style}
            style.top = this.$refs.container.style.top
            style.left = this.$refs.container.style.left
            style.width = this.$refs.container.style.width
            style.height = this.$refs.container.style.height
            this.setContainerStyle({index:this.index,style})
    }
    mousedown = false;
    editingName = false;
    updateName(e) {
        this.editingName = false;
        this.setContainerName({index:this.index,name:e.target.value});
    }
    mouseMove(e) {
        let boundingBox = this.$refs.container.getBoundingClientRect()
        let iconBox = window.iconObject.getBoundingClientRect()
        if(this.mousedown === 'position')
        {
            let style = {...this.container.style}
            style.top = e.clientY +'px'
            style.left = e.clientX-5-iconBox.width/2-boundingBox.width + 'px'
            Object.assign(this.$refs.container.style,style);
        }
        if(this.mousedown === 'width')
        {
            let style = {...this.container.style}
            style.width = e.clientX-5-iconBox.width/2-boundingBox.x + 'px'
            Object.assign(this.$refs.container.style,style);
        }
        if(this.mousedown === 'height')
        {
            let style = {...this.container.style}
            style.height = e.clientY-5-iconBox.height/2-boundingBox.y +'px'
            Object.assign(this.$refs.container.style,style);
        }
        if(this.mousedown === 'size')
        {
            let style = {...this.container.style}
            style.height = e.clientY-5-iconBox.height/2-boundingBox.y +'px'
            style.width = e.clientX-5-iconBox.width/2-boundingBox.x + 'px'
            Object.assign(this.$refs.container.style,style);
        }
    }
    setMouseDown(mousedown,event) {
        if(!this.mousedown && mousedown)
        {
            this.mousedown = mousedown
            window.iconObject = event.target
            this.overlay.onmousemove = this.mouseMove;
            this.overlay.onmouseup = ()=>this.setMouseDown(false)
        } else if(this.mousedown && !mousedown) {
            this.mousedown = false
            let style = {...this.container.style}
            style.top = this.$refs.container.style.top
            style.left = this.$refs.container.style.left
            style.width = this.$refs.container.style.width
            style.height = this.$refs.container.style.height
            this.setContainerStyle({index:this.index,style})
            window.iconObject = undefined;
            this.overlay.onmousemove = undefined;
            this.overlay.onmouseup = undefined;
        }
    }
    mounted() {
        Object.assign(this.$refs.container.style,this.container.style);
    }
    updated() {
        Object.assign(this.$refs.container.style,this.container.style);
    }
}
</script>
<style lang="scss">
.container {
    position: relative;
    background-color: #fff;
    position: absolute;
    display:grid;
    grid-template-columns: auto min-content;
    grid-auto-rows: min-content;
    align-items: center;
    grid-column-gap: 1rem;
    &__head,&__body {
        display: contents;
    }
    &__body {
        & > * {
            grid-column-end: span 2;
        }
    }
    &__head {
        padding: 0.5rem;
        .title {
            margin: 0;
        }
        .tabs {
            display:grid;
            grid-column-gap: 1rem;
            white-space: nowrap;
            & > * {
                grid-row-start: 1;
            }
        }
    }
    .editing-buttons {
        display:contents;
        & > * {
            position: absolute;
        }
        .container{
            & > * {
                width:15px;
                height:15px;
            }
            &-position {
                top: -5px;
                right: -5px;
                transform:translateX(100%)
            }
            &-width {
                bottom: 50%;
                right: -5px;
                transform:translate(100%, 50%)
            }
            &-height {
                bottom: -5px;
                right: 50%;
                transform:translate(50%,100%)
            }
            &-size {
                bottom: -5px;
                right: -5px;
                transform:translate(100%,100%)
            }
        }
    }
}
</style>