import { Component, Inject, OnInit } from '@angular/core';
import {
  NgxViacepService,
  Endereco,
  CEPError,
} from "@brunoc/ngx-viacep";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

type Lamp = {
  nome: string;
  modelo: {
    fabricante: string;
    dataFabricacao: Date;
    vidaUtil: number;
  };
  localizacao: {
    number: number;
    zip_code: number;
    street: string;
    disctrict: string;
    state: string;
    reference: string;
  };
};

type LampModels = {
  id: string;
  dataFabricacao: Date;
  fabricante: string;
  vidaUtil: number;
};

@Component({
  selector: 'app-create-lamp',
  templateUrl: './create-lamp.component.html',
  styleUrls: ['./create-lamp.component.scss'],
})
export class CreateLampComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  lamps = [
    {
      nome: 'Lampada de teste 1',
      modelo: '1',
      localizacao: {
        disctrict: 'Distrito',
        number: 20,
        state: 'Estado',
        city: 'Cidade',
        street: 'Rua',
        reference: 'referencia',
        zip_code: '44071740',
      },
    },
  ];

  lampModels: LampModels[] = [
    {
      id: '1',
      dataFabricacao: new Date(),
      fabricante: 'Inbraled',
      vidaUtil: 120,
    },

    {
      id: '2',
      dataFabricacao: new Date(),
      fabricante: 'Philips',
      vidaUtil: 220,
    },
    {
      id: '3',
      dataFabricacao: new Date(),
      fabricante: 'Outros',
      vidaUtil: 120,
    },
  ];

  constructor(private formBuilder: FormBuilder, private viacep: NgxViacepService, private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      fabricator: ['', Validators.required],
      modelFabricator: ['', Validators.required],
      fabricateDate: [new Date(), Validators.required],
      lifeTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._locale = 'pt-br';
    this._adapter.setLocale(this._locale);
  }

  get lampsGetter(): FormArray {
    return this.form.get('lamps') as FormArray;
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
        console.log(endereco);
      });
  }

  addLamp() {
    this.lamps = [
      ...this.lamps,
      {
        nome: 'Lampada de teste ' + (this.lamps.length + 1),
        modelo: this.lampModels[0].id,
        localizacao: {
          disctrict: 'Distrito',
          number: 20,
          state: 'Estado',
          street: 'Rua',
          reference: 'referencia',
          zip_code: '44071740',
          city: 'Cidade',
        },
      },
    ];
    this.lampsGetter.push(
      new FormGroup({
        nome: new FormControl('Lampada de teste ' + (this.lamps.length + 1)),
        modelo: new FormControl(this.lampModels[0].id),
        localizacao: new FormGroup({
          disctrict: new FormControl(''),
          number: new FormControl(''),
          state: new FormControl(''),
          street: new FormControl(''),
          reference: new FormControl(''),
          zip_code: new FormControl(''),
          city: new FormControl(''),
        }),
      })
    );
  }

  buildLamp() {
    const values = this.lamps.map(
      (lamp) =>
        new FormGroup({
          nome: new FormControl(lamp.nome),
          modelo: new FormControl(lamp.nome),
          localizacao: new FormGroup({
            disctrict: new FormControl(lamp.localizacao.disctrict),
            number: new FormControl(lamp.localizacao.number),
            state: new FormControl(lamp.localizacao.state),
            street: new FormControl(lamp.localizacao.street),
            reference: new FormControl(lamp.localizacao.reference),
            zip_code: new FormControl(lamp.localizacao.zip_code),
            city: new FormControl(lamp.localizacao.city),
          }),
        })
    );

    return this.formBuilder.array(values);
  }

  getLampsControls() {
    return (this.form.get('lamps') as FormArray).controls;
  }
  getLampsLocalizacaoControls(key: any) {
    const lampsControl = this.lampsGetter.controls[key] as any;

    return lampsControl.controls.localizacao.controls;
  }

  getLampsInputControls(name: any) {
    return name.controls;
  }

  submitForm() {
    if (!this.form.valid) return;
    console.log(this.form.value);
  }
}
