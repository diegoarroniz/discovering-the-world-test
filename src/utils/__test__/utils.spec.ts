import { shorten, validator } from '..'; // Adjust the import path as necessary

describe('Utils Testing', () => {
    describe('shorten', () => {
        test('returns the same string if under maxLen', () => {
            const input = 'Hello';
            const output = shorten(input, 10);
            expect(output).toBe(input);
        });

        test('shortens the string and adds ellipsis if over maxLen', () => {
            const input = 'Hello, world!';
            const output = shorten(input, 5);
            expect(output).toBe('Hello...');
        });

        test('shortens at the last space before maxLen', () => {
            const input = 'Hello amazing world';
            const output = shorten(input, 10);
            expect(output).toBe('Hello...');
        });
    })

    describe('validator', () => {
        test('returns error for empty value', () => {
            expect(validator({ name: 'title', value: '' })).toBe('Please fill out this field.');
          });
        
          test('validates title length', () => {
            expect(validator({ name: 'title', value: 'Short' })).toBe('The title must contain more than 5 and less than 25 characters.');
            expect(validator({ name: 'title', value: 'This is a valid title' })).toBe('');
            expect(validator({ name: 'title', value: 'This title is way too long for the validator function to accept it' })).toBe('The title must contain more than 5 and less than 25 characters.');
          });
        
          test('validates description length', () => {
            expect(validator({ name: 'description', value: 'Too short' })).toBe('The description must contain more than 20 characters.');
            expect(validator({ name: 'description', value: 'This is a sufficiently long description' })).toBe('');
          });
        
          test('validates image URL', () => {
            expect(validator({ name: 'image', value: 'http://www.example.com' })).toBe('');
            expect(validator({ name: 'image', value: 'not_a_valid_url' })).toBe('Please enter a valid URL.');
          });
    })

});
