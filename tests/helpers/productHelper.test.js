import { describe, expect, it } from "vitest";
import { parseHalfPrice } from "@/helpers/ProductHelper";

describe('Product Helper', () => {
    it('should return half of the price when it is an integer', () => {        
        expect(parseHalfPrice(10)).toBe(5);
    });
  
    it('should return half of the price with precision when it is not an integer', () => {
        expect(parseHalfPrice(5)).toBe('2.50');
        expect(parseHalfPrice(2.75)).toBe('1.38');
    });
  
    it('should handle prices with more than two decimal places', () => {
        expect(parseHalfPrice(7.555)).toBe('3.78');
    });
  
    it('should return a rounded value when precision is too high', () => {
        expect(parseHalfPrice(5.789)).toBe('2.89');
    });
});