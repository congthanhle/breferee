export const FORMAT_CURRENCY = (value) => {
  const formattedValue = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
  return formattedValue.replace('₫', '₫').replace('₫', 'đ');
};

export const FORMAT_NUMBER = (value, locale = 'vi-VN') => {
  if (value === null || value === undefined || isNaN(value)) return '';
  return new Intl.NumberFormat(locale).format(value);
};

export const FORMAT_PHONE_NUMBER = (mobileNumber) => {
  const cleaned = mobileNumber?.replace(/\D/g, '');
  const match = cleaned?.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return mobileNumber;
};

export const FORMAT_DATE = (dateString, format = 'DD/MM/YYYY') => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return format.replace('DD', day).replace('MM', month).replace('YYYY', year);
};

const SWAP = (str) => {
  let result = '';
  for (let i = 0; i < str.length; i += 2) {
    const sub = str.substring(i, i + 2);
    result += (sub[1] || '') + sub[0];
  }
  return result;
};

export const ENCRYPT = (str) => {
  const base64 = btoa(str).replace(/=+$/, '');
  return SWAP(base64);
};
