const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

const API_KEY = getEnvVar('REACT_APP_API_KEY');
const ENDPOINT = getEnvVar('REACT_APP_API_ENDPOINT');

const replacePlaceholders = (url: string): string => {
  return url.replace('<ENDPOINT>', ENDPOINT).replace('<API_KEY>', API_KEY);
};

export const ENDPOINT_DISCOVER = replacePlaceholders(
  getEnvVar('REACT_APP_ENDPOINT_DISCOVER')
);
export const ENDPOINT_SEARCH = replacePlaceholders(
  getEnvVar('REACT_APP_ENDPOINT_SEARCH')
);
export const ENDPOINT_MOVIE = replacePlaceholders(
  getEnvVar('REACT_APP_ENDPOINT_MOVIE')
);

export const WATCH_LATER_STORAGE_KEY = getEnvVar(
  'REACT_APP_WATCH_LATER_STORAGE_KEY'
);
export const STARRED_STORAGE_KEY = getEnvVar('REACT_APP_STARRED_STORAGE_KEY');

// const API_KEY = process.env.REACT_APP_API_KEY!;
// const ENDPOINT = process.env.REACT_APP_API_ENDPOINT!;

// export const ENDPOINT_DISCOVER = process.env
//   .REACT_APP_ENDPOINT_DISCOVER!.replace('<ENDPOINT>', ENDPOINT)
//   .replace('<API_KEY>', API_KEY);

// export const ENDPOINT_SEARCH = process.env
//   .REACT_APP_ENDPOINT_SEARCH!.replace('<ENDPOINT>', ENDPOINT)
//   .replace('<API_KEY>', API_KEY);

// export const ENDPOINT_MOVIE = process.env
//   .REACT_APP_ENDPOINT_MOVIE!.replace('<ENDPOINT>', ENDPOINT)
//   .replace('<API_KEY>', API_KEY);

// export const WATCH_LATER_STORAGE_KEY =
//   process.env.REACT_APP_WATCH_LATER_STORAGE_KEY!;
// export const STARRED_STORAGE_KEY = process.env.REACT_APP_STARRED_STORAGE_KEY!;
