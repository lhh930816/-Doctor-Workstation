<template>
    <div id="#app">
 
        <button @click="btn1">-</button>
               <span>{{count}}</span>
        <button @click='btn2'>+</button>
    </div>
</template>
<script>
    //引入ampActions
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: mapGetters ([
        'count'
    ]),
    methods: mapActions ([
        'btn1',
        'btn2'
    ])
}
</script>