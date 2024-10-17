<template>
    <li @click="clicked">
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
    }
});
const emit = defineEmits(['selected']);

const clicked = () => {
    if(props.id) {
        emit('selected', { index: props.index, id: props.id });
    }
    else {
        emit('selected', props.index);
    }    
}
</script>