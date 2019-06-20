<template>
    <div>
        <input type='text' v-focus>
        <div class='tabs'>
            <a href="javascript:void(0)" class='tab' @click='toggleTab(first)'>第一项</a>
            <a href="javascript:void(0)" class='tab' @click='toggleTab(second)'>第二项</a>
            <a href="javascript:void(0)" class='tab' @click='toggleTab(third)'>第三项</a>
        </div>
        <div :is="currentView"></div> 
    </div>    
</template>
<script>
import first from '@/components/first'
import second from '@/components/second'
import third from '@/components/third'
export default {
    data () {
        return {
            first: 'first',
            second: 'second',
            third: 'third',
            currentView: 'first'
        }
    },
    components: {
        first,
        second,
        third
    },
    methods: {
        toggleTab (tabText) {
            this.currentView = tabText;
        }
    },
    directives: {
        focus: {
            inserted (el) {
                el.focus();
            }
        }
    }
}
</script>
<style lang="scss">
    
</style>