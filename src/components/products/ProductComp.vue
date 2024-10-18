<template>
    <li :class="{ disabled : disabled }" @click="clicked">
        <slot name="label"></slot>
        <slot></slot>
    </li>
</template>

<script setup>
const props = defineProps({
    index: {
        type: Number, 
        required: true
    }, 
    id: {
        type: String
    }, 
    disabled: {
        type: Boolean
    }
});
const emit = defineEmits(['selected']);

const clicked = () => {
    if(!props.disabled) {
        if(props.id) {
            emit('selected', { index: props.index, id: props.id });
        }
        else {
            emit('selected', props.index);
        } 
    }
}
</script>

<style>

.disabled {
    text-decoration: line-through;
}

</style>