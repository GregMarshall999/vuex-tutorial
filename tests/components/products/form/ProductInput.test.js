import ProductInput from "@/components/products/form/ProductInput.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('Product Input Test', () => {
    it('renders input with correct placeholder and type', () => {
        const wrapper = mount(ProductInput, {
            props: {
                placeholder: 'Enter text',
                type: 'text',
                errors: false
            }
        });

        const input = wrapper.find('input');
        expect(input.attributes('placeholder')).toBe('Enter text');
        expect(input.attributes('type')).toBe('text');
    });

    it('applies error class when errors prop is true', async () => {
        const wrapper = mount(ProductInput, {
            props: {
                placeholder: 'Enter text',
                type: 'text',
                errors: true
            }
        });

        const input = wrapper.find('input');
        expect(input.classes()).toContain('error');
    });

    it('updates input value with v-model', async () => {
        const wrapper = mount(ProductInput, {
            props: {
                placeholder: 'Enter text',
                type: 'text',
                errors: false,
                modelValue: ''
            }
        });

        const input = wrapper.find('input');
        await input.setValue('new value');
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value']);
    });

    it('renders slot content', () => {
        const wrapper = mount(ProductInput, {
            props: {
                placeholder: 'Enter text',
                type: 'text',
                errors: false
            },
            slots: {
                default: '<div class="slot-content">Slot content</div>'
            }
        });

        expect(wrapper.find('.slot-content').exists()).toBe(true);
    });
});