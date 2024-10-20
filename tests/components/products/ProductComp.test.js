import ProductComp from "@/components/products/ProductComp.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('Product Component tests', () => {
    it('renders slots content', () => {
        const wrapper = mount(ProductComp, {
            props: {
                index: 1
            },
            slots: {
                label: '<span>Label</span>',
                default: '<span>Content</span>'
            }
        });

        expect(wrapper.html()).toContain('<span>Label</span>');
        expect(wrapper.html()).toContain('<span>Content</span>');
    });

    it('emits selected event with index when clicked and id is not provided', async () => {
        const wrapper = mount(ProductComp, {
            props: {
                index: 2
            }
        });

        await wrapper.trigger('click');
        expect(wrapper.emitted('selected')).toHaveLength(1);
        expect(wrapper.emitted('selected')[0]).toEqual([2]);
    });

    it('emits selected event with index and id when clicked', async () => {
        const wrapper = mount(ProductComp, {
            props: {
                index: 3,
                id: 'test-id'
            }
        });

        await wrapper.trigger('click');
        expect(wrapper.emitted('selected')).toHaveLength(1);
        expect(wrapper.emitted('selected')[0]).toEqual([{ index: 3, id: 'test-id' }]);
    });

    it('does not emit selected event when disabled', async () => {
        const wrapper = mount(ProductComp, {
            props: {
                index: 4,
                disabled: true
            }
        });

        await wrapper.trigger('click');
        expect(wrapper.emitted('selected')).toBeUndefined();
    });

    it('applies the disabled class when disabled is true', () => {
        const wrapper = mount(ProductComp, {
            props: {
                index: 5,
                disabled: true
            }
        });

        expect(wrapper.classes()).toContain('disabled');
    });
});