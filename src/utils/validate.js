export function validatePhoneNumber (phoneNumber) {
  if (!phoneNumber) return false;
  const cleaned = phoneNumber.toString().trim().replace(/\s/g, '');
  const pattern1 = /^0[3|5|7|8|9]\d{8}$/;
  const pattern2 = /^84[3|5|7|8|9]\d{8}$/;
  const pattern3 = /^\+84[3|5|7|8|9]\d{8}$/;
  return (
    pattern1.test(cleaned) || pattern2.test(cleaned) || pattern3.test(cleaned)
  );
}

export function validateIdentityNumber (identityNumber) {
  if (!identityNumber) return false;
  const cleaned = identityNumber.toString().trim().replace(/\s/g, '');
  const pattern = /^\d{12}$/;
  return pattern.test(cleaned);
}

export const phoneNumberValidator = (_, value) => {
  if (!value) {
    return Promise.resolve();
  }
  if (validatePhoneNumber(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Vui lòng nhập đúng số điện thoại'));
};

export const identityNumberValidator = (_, value) => {
  if (!value) {
    return Promise.resolve();
  }
  if (validateIdentityNumber(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Vui lòng nhập đúng số CCCD'));
};
