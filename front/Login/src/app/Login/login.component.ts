import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public myForm!: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,

    ) { }

    ngOnInit(): void {
        this.myForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    get formControl() {
        return this.myForm.controls;
    }

    public submitDates() {
        if (this.formControl['userName'].value === 'admin'
            && this.formControl['password'].value === 'admin') {
            this.router.navigate(['/register'])
        } else
            console.log('no funciona')
    }
}
