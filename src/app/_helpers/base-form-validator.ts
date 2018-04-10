import { FormGroup, FormControl } from "@angular/forms";

export class BaseFormValidator {


    baseForm?: FormGroup;

    constructor() { }

    isFieldValid(field: string) {
        if (this.baseForm) {
            return !this.baseForm.get(field).valid && this.baseForm.get(field).touched;
        }
        return true;
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            console.log(field);
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
        };
    }
}
