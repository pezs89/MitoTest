import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'form-input',
    templateUrl: 'formInput.component.html'
})

export class FormInput {
    @Input('config') config: any;
    @Input('groupName') groupName: FormGroup;
    @Input('showErrorOnSubmit') isVisible: boolean;
}