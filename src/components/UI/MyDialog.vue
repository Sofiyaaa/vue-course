<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-dialog',
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    }, 
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    }
}
</script>

<style scoped>
.dialog {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
}

.dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    padding: 20px;
}
</style>