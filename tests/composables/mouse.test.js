import { useMouse } from "@/composables/mouse";
import { beforeEach, describe, expect, it } from "vitest";
import { ref } from "vue";
import { mount } from '@vue/test-utils'

describe('useMouse Composable', () => {
    let element;

    beforeEach(() => {
        element = ref(document.createElement('div'));
    });

    it('should initialize x and y as 0', () => {
        const { x, y } = useMouse(element);
        expect(x.value).toBe(0);
        expect(y.value).toBe(0);
    });

    
});