import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import * as Raven from 'raven-js';

Raven.config('https://b07f54bbcf094f128ed43c3bc87cfacf@sentry.io/211979').install();


@Injectable()
export class ClientErrorHandler extends IonicErrorHandler implements ErrorHandler {

    constructor(private platform: Platform) {
        super();
    }

    handleError(err): void {
        super.handleError(err);
        try {
            Raven.captureException(err);
        } catch (e) {
            console.log(e);
        }
    }
}