<template>
    <div>
        <a :href='href'
            :class='{active: isActive}'
            @click='go'>
        <slot></slot>
        </a>
    </div>
</template>
<script>
import routes from ''
export default {
    
}
</script>