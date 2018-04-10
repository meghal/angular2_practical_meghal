import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { BaseFormValidator } from '../_helpers/base-form-validator';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CropperSettings } from 'ng2-img-cropper/src/cropperSettings';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html'
})

export class RegisterComponent extends BaseFormValidator {
    form: FormGroup;
    loading = false;
    data: any;
    cropperSettings: CropperSettings;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
        super();
        this.createForm();
        this.baseForm = this.form;
        this.initilizeCropper();
    }

    register() {

        if (this.form.valid) {
            if (this.data && this.data.image) {
                this.form.addControl('image', new FormControl(this.data.image));
            }
            this.userService.create(this.form.value)
                .subscribe(
                    data => {
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        } else {
            this.validateAllFormFields(this.form);
        }
    }

    checkMaxLength(field: string) {
        if (this.form) {
            return this.form.controls[field].hasError('maxlength') ? 'Max allowed length is 30' : null;
        }
    }
    createForm() {
        this.form = this.formBuilder.group({
            fName: [null, [Validators.required, Validators.maxLength(30)]],
            lName: [null, [Validators.required, Validators.maxLength(30)]],
            uName: [null, [Validators.required, Validators.maxLength(30)]],
            password: [null, [Validators.required]],
            mobile: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            address: [null, [Validators.required]],
            dob: ['', [Validators.required, this.dobCustomValidator]]
        });
    }

    dobCustomValidator(control: AbstractControl) {
        if (new Date(control.value) > new Date()) {
            return { invalidDate: true };
        }
        return null;
    }

    checkDOB(field) {
        if (this.form) {
            return this.form.controls[field].hasError('invalidDate') ? 'Date of Birth should not be greater than current date' : null;
        }
    }

    initilizeCropper() {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 250;

        this.data = {};
    }
}
