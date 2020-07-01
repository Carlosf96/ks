export const isError = (errors: any, field: string, touched?: any) =>
  touched.length ? errors[field] && touched[field] : !!errors[field];

export const isMobile = (): boolean =>
  /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(
    window.navigator.userAgent ||
      window.navigator.vendor ||
      (window as any).opera,
  );

export const isAuthenticated = () => {
  return (
    localStorage.getItem('user') !== null &&
    localStorage.getItem('user') !== undefined
  );
};

/**
 * checks if user is admin or not
 *
 */
export const getRole = () => {
  return JSON.parse(
    atob(
      JSON.parse(String(localStorage.getItem('user'))).token.split(
        '.',
      )[1],
    ),
  ).role;
};

// export const stableQuickSort = () => {

// }
