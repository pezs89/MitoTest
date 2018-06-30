import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'form-button',
    templateUrl: 'formButton.component.html'
})

export class FormButton {
    @Input('config') config: any;
    @Input('groupName') groupName: FormGroup;
}