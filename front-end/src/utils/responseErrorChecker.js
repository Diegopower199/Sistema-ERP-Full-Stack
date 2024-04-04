export function checkResponseForErrors(response) {
  let backendError = false;
  let errorMessage = "";
  let backendOrDDBBConnectionError = false;

  if (response.status === 409) {
    backendError = true;
    errorMessage = response.errorMessage;
  } else if (response.status === 500) {
    backendOrDDBBConnectionError = true;
    errorMessage = response.errorMessage;
  }

  return {
    backendError,
    errorMessage,
    backendOrDDBBConnectionError,
  };
}
