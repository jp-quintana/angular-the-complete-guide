import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

const loggingInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG', 'TESTING'),
  // });

  return next(request);
};

// bootstrapApplication(AppComponent, {
//   providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
// }).catch((err) => console.error(err));

bootstrapApplication(AppComponent, { providers: [provideHttpClient()] }).catch(
  (err) => console.error(err)
);
