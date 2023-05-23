import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

type User = {
    name: string;
    email: string;
    password: string;
    permission: string;
}

type Permissions = {
    id: string;
    title: string;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {

  permissions: Permissions[] = [
    {
        id: '1',
        title: 'Admin'
    },
    {
        id: '2',
        title: 'Operador'
    },
    {
        id: '3',
        title: 'Tecnico'
    }
  ];

  userForm = new FormGroup({
    user: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    permission: new FormControl('', Validators.required)
  });

  submitForm() {
    if (!this.userForm.valid) return;
    console.log(this.userForm.value);
  }
}
