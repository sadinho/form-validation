const  validationPassword = require('../PasswordValidation');

test('222222 to equal true', () => {
  expect(validationPassword(222222)).toBe(true);
});

test('236775  to equal false', () => {
  expect(validationPassword(236775)).toBe(false);
});

test('135789  to equal false', () => {
  expect(validationPassword(236775)).toBe(false);
});