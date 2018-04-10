import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { BaseFormValidator } from '../_helpers/base-form-validator';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent extends BaseFormValidator implements OnInit {
    form: FormGroup;
    loading = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        super();
        this.createForm();
        this.baseForm = this.form;
    }

    ngOnInit() {
        // create form

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    createForm() {
        this.form = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
        });
    }

    login() {
        this.loading = true;
        if (this.form.valid) {
            this.authenticationService.login(this.form.controls['email'].value, this.form.controls['password'].value)
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        } else {
            this.validateAllFormFields(this.form);
        }
    }
}
