import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'form-error',
    templateUrl: 'formError.component.html'
})

export class FormError implements OnChanges {
    @Input('showErrorOnSubmit') showOnSubmit: boolean;
    @Input('errors') errors: Object;
    @Input('label') fieldLabel: string;
    errorMessage: string = '';

    ngOnChanges(change: SimpleChanges) {
        if (!change.errors) {
            return;
        }
        this.errorMessage = '';
        if (change.errors.currentValue !== null) {
            Object.keys(change.errors.currentValue).map(key => {
                if (key === 'required') {
                    this.errorMessage = this.fieldLabel + ' is required!';
                } else {
                    this.errorMessage = this.errors[key];
                }
            })
        }
    }
}