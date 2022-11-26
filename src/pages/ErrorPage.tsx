import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import { tError } from "../types/tError";

export default function ErrorPage(): JSX.Element {
  const error: unknown = useRouteError();

  if (error instanceof Error) {
    console.log(error.message);
  } else if (isRouteErrorResponse(error)) {
    console.log(error.status, error.statusText);
  } else {
    console.log("Unexpected error: ", error);
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error instanceof Error
        ? error.message
        : isRouteErrorResponse(error)
        ? error.statusText
        : (error as tError).statusText}
    </div>
  );
}
