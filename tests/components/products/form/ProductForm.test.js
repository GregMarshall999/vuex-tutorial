import ProductForm from "@/components/products/form/ProductForm.vue";
import ProductInput from "@/components/products/form/ProductInput.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('Product Form tests', () => {
    const fields = [
        { placeholder: 'Name', type: 'text', value: '', rules: [val => !!val || 'Name is required'] },
        { placeholder: 'Price', type: 'number', value: '', rules: [val => val > 0 || 'Price must be positive'] }
    ];

    it('renders correct number of ProductInput components', () => {
        const wrapper = mount(ProductForm, {
            props: {
                fields,
                submitButtonText: 'Submit'
            }
        });

        const inputs = wrapper.findAllComponents(ProductInput);
        expect(inputs.length).toBe(fields.length);
    });

    it('displays error messages when validation fails', async () => {
        const wrapper = mount(ProductForm, {
            props: {
                fields,
                submitButtonText: 'Submit'
            }
        });

        await wrapper.find('form').trigger('submit.prevent');

        const errors = wrapper.findAll('.error'); //All elements with .error class

        expect(errors.length).toBe(4);
        expect(errors[1].text()).toBe('Name is required');
        expect(errors[3].text()).toBe('Price must be positive');
    });

    it('emits success event with form values when form is valid', async () => {
        const wrapper = mount(ProductForm, {
            props: {
                fields: [
                    { placeholder: 'Name', type: 'text', value: 'Apple', rules: [val => !!val || 'Name is required'] },
                    { placeholder: 'Price', type: 'number', value: 10, rules: [val => val > 0 || 'Price must be positive'] }
                ],
                submitButtonText: 'Submit'
            }
        });

        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.emitted('success')).toHaveLength(1);
        expect(wrapper.emitted('success')[0]).toEqual([['Apple', 10]]);
    });
});