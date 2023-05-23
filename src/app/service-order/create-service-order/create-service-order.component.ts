import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxViacepService, Endereco, CEPError } from "@brunoc/ngx-viacep";
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-create-service-order',
  templateUrl: './create-service-order.component.html',
  styleUrls: ['./create-service-order.component.scss']
})
export class CreateServiceOrderComponent implements OnInit {

  empForm!: FormGroup;
  address: any;
  
  constructor(private fb: FormBuilder, private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string, private viacep: NgxViacepService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this._locale = 'pt-br';
    this._adapter.setLocale(this._locale);
    this.empForm = this.fb.group({
      services: this.fb.array([])
    });
    this.services().push(this.newService());
    this.serviceLamps(0).push(this.newLamp());
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  services(): FormArray {
    return this.empForm.get('services') as FormArray;
  }

  newService(): FormGroup {
    return this.fb.group({
      code: '',
      priority: '',
      maxDate: '',
      responsible:'',
      lamps: this.fb.array([])
    });
  }

  removeService(empIndex: number) {
    this.services().removeAt(empIndex);
  }

  serviceLamps(empIndex: number): FormArray {
    return this.services()
      .at(empIndex)
      .get('lamps') as FormArray;
  }

  newLamp(): FormGroup {
    return this.fb.group({
      name: '',
      service_type: '',
      cep: '',
      state: '',
      city: '',
      district: '',
      street: '',
      number: '',
      reference: ''
    });
  }

  addserviceLamp(empIndex: number) {
    this.serviceLamps(empIndex).push(this.newLamp());
  }

  removeserviceLamp(empIndex: number, LampIndex: number) {
    this.serviceLamps(empIndex).removeAt(LampIndex);
  }

  onSubmit() {
    console.log(this.empForm.value);
  }

  buscaCep(cep: string) {
    console.log("essa é a string do cep:" + cep);
    this.getCep(cep);
  }

  getCep(cep: string) {
    console.log("Chamou função getCep");
    this.viacep
      .buscarPorCep(cep)
      .pipe(
        catchError((error: CEPError) => {
          // Ocorreu algum erro :/
          console.log(error.message);
          return EMPTY;
        })
      )
      .subscribe((endereco: Endereco) => {
        // Endereço retornado :)
        this.address = endereco;
        console.log(this.address);
      });
  }
}
