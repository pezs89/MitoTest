import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'form-select',
    templateUrl: 'formSelect.component.html'
})

export class FormSelect {
    @Input('config') config: any;
    @Input('groupName') groupName: FormGroup;
    @Input('showErrorOnSubmit') isVisible: boolean;
}