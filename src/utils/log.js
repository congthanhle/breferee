const log = (action, message, ...optionalParams) => {
  console[action](message, ...optionalParams);
};

const debug = (message, ...optionalParams) => log('log', message, ...optionalParams);
const warn = (message, ...optionalParams) => log('warn', message, ...optionalParams);
const error = (message, ...optionalParams) => log('error', message, ...optionalParams);

export { debug, warn, error };