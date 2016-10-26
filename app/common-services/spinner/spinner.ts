'use strict';

import {Component, Input, OnDestroy} from '@angular/core';

@Component({
    selector: 'my-spinner',
    templateUrl: 'app/common-services/spinner/spinner.html',
    styleUrls: ['app/common-services/spinner/spinner.css']
})
export class SpinnerComponent implements OnDestroy {
    private currentTimeout: number;
    private isDelayedRunning: boolean = false;

    @Input()
    public delay: number = 300;

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.isDelayedRunning = false;
        } else {
            this.isDelayedRunning = true;
        }
    }



    ngOnDestroy(): any {
        //this.cancelTimeout();
    }
}