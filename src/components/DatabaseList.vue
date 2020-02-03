<template>
    <div class="database-list">
        <div class="database-list__head">
            <span v-for="attribute in data.head" :key="attribute">{{attribute}}</span>
        </div>
        <div class="database-list__body">
            <div v-for="(item,index) in data.items" :key="index" class="database-list__item">
                <span v-for="attribute in data.head" :key="attribute">{{item[attribute]}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
    name:'database-list'
})
export default class DatabaseList extends Vue {
    @Prop({required:true}) data;
}
</script>
<style lang="scss">
    .database-list {
        display:grid;
        grid-gap: 1rem;
        &__head,&__body,&__item {
            display: contents;
        }
        &__head {
            span {
                grid-row-start: 1;
            }
        }
    }
</style>