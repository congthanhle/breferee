import { debug, error, warn } from '@/utils/log';
import { notification } from 'antd';

const call = (type, message, options = {}) =>
  notification[type]({ message, ...options });

const notice = {
  success (message, options = {}) {
    debug(message);
    return call('success', message, options);
  },
  info (message, options = {}) {
    debug(message);
    return call('info', message, options);
  },
  error (message, options = {}) {
    error(message);
    return call('error', message, options);
  },
  warning (message, options = {}) {
    warn(message);
    return call('warning', message, options);
  },
};

export default notice;