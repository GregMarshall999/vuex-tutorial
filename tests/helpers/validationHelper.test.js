import { describe, it, expect } from "vitest";
import { requiredText, requiredPositiveNumber } from "@/helpers/ValidationHelper";

describe('Validation Helper', () => {
    describe('requiredText', () => {
        it('should return an error if the value is null or undefined', () => {
            expect(requiredText(null)).toBe('Ce champ est obligatoire!');
            expect(requiredText(undefined)).toBe('Ce champ est obligatoire!');
        });
    
        it('should return an error if the value is an empty string', () => {
            expect(requiredText('')).toBe('Veuillez remplir ce champ!');
        });
    
        it('should return true if the value is a non-empty string', () => {
             expect(requiredText('Test')).toBe(true);
        });
    });

    describe('requiredPositiveNumber', () => {
        it('should return an error if the value is null or undefined', () => {
            expect(requiredPositiveNumber(null)).toBe('Ce champ est obligatoire!');
            expect(requiredPositiveNumber(undefined)).toBe('Ce champ est obligatoire!');
        });
    
        it('should return an error if the value is less than or equal to zero', () => {
            expect(requiredPositiveNumber(0)).toBe('Ce champ doit avoir une valeur positive!');
            expect(requiredPositiveNumber(-1)).toBe('Ce champ doit avoir une valeur positive!');
        });
    
        it('should return true if the value is positive', () => {
            expect(requiredPositiveNumber(5)).toBe(true);
            expect(requiredPositiveNumber(1)).toBe(true);
        });
    });
});