import { AxiosError, HttpStatusCode } from "axios";
import { Observable, throwError, timer } from "rxjs";

interface RetryParameters {
    scalingDuration?: number;
    maxRetryAttempts?: number;
    excludedStatusCodes?: Array<HttpStatusCode>;
    excludedStatusCodeFamilies?: Array<StatusCodeFamily>;
}

interface GenericRetryConfig {
    delay: (error: AxiosError, retryAttempts: number) => Observable<0>;
}

type StatusCodeFamily = 100 | 200 | 300 | 400 | 500;

export const genericRetryConfig = ({
    maxRetryAttempts = 2,
    scalingDuration = 1000,
    excludedStatusCodes = [],
    excludedStatusCodeFamilies = [],
  }: RetryParameters = {}): GenericRetryConfig => {
    const toStatusCodeFamily = (statusCode: number) => {
      return (Math.floor(statusCode / 100) * 100) as StatusCodeFamily;
    };
    return {
      delay: (error: AxiosError, retryAttempts: number) => {
        if (
          retryAttempts > maxRetryAttempts ||
          excludedStatusCodes.includes(error.response?.status ?? 0) ||
          excludedStatusCodeFamilies.includes(toStatusCodeFamily(error.response?.status ?? 0))
        ) {
          return throwError(() => error);
        }
        return timer(retryAttempts * scalingDuration);
      },
    };
  };