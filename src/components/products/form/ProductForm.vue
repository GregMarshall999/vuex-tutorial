<template>
    <form @submit.prevent="submit">
        <ProductInput 
            v-for="(field, index) in fields"
            :placeholder="field.placeholder"
            :type="field.type"
            v-model="field.value"
            :errors="errors.has(index)">
            <span class="error" v-if="errors.has(index)">{{ errors.get(index) }}</span>
        </ProductInput>
        <button type="submit">{{ submitButtonText }}</button>
    </form>
</template>

<script setup>
import { reactive } from 'vue';
import ProductInput from './ProductInput.vue';

const props = defineProps({
    fields: {
        type: Array, 
        required: true
    }, 
    submitButtonText: ''
});

const emit = defineEmits(['success']);

const errors = reactive(new Map());
const submit = () => {
    var i = 0;
    errors.clear();
    
    const submitResult = [];
    
    for(var field of props.fields) {        
        //Execute all rules for the field
        const rulesResult = field.rules.map(rule => rule(field.value));

        //if not True, add message to errors and break (1st message only)
        for(var res of rulesResult) {
            if(res !== true) {
                errors.set(i, res);
                break;
            }
        }

        submitResult.push(field.value);

        i++;
    }

    if(errors.size === 0) {
        emit('success', submitResult);
    }
}

</script>

<style lang="scss" scoped>
@import '@/scss/GlobalStyle.scss';

form {
    display: flex;
    flex-direction: column;
    gap: 1em;

    .error {
        color: rgb(223, 197, 53);
        background: rgb(100, 97, 57);
        font-weight: bold;
        width: fit-content;
        padding: 1px;
    }

    button {
        @include button;
    }
}

</style>