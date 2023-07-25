import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentTypes } from 'src/app/core/models/documentTypes/document-types';
import { Genders } from 'src/app/core/models/genders/genders';
import { AuthenticationRequest } from 'src/app/core/models/users/authentication-request';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public documentTypes: DocumentTypes[];
  public genders: Genders[];
  hide = true;
  constructor(public formBuilder: FormBuilder, public accountService: AccountService, private snackBar: MatSnackBar, public genericService: GenericService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      role: [environment.clientRole, Validators.required],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: [0, Validators.required],
      tipoDocumento: [0, Validators.required],
      numeroDocumento: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      telefonoContacto: ['', Validators.required],
    });
    this.accountService.ValidateSesion();
    this.LoadLists();
  }
  SignIn() {
    this.loadingService.ChangeStatusLoading(true);
    this.accountService.Register(this.form.value).subscribe(result => {
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
    }, error => {
      console.error(error);
      this.openSnackBar(error.error.Message);
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  LoadLists() {
    this.genericService.GetAll('DocumentTypes').subscribe(data => {
      this.documentTypes = data.data;
      this.genericService.GetAll('Genders').subscribe(data => {
        this.genders = data.data;
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
      })
    });
  }
}