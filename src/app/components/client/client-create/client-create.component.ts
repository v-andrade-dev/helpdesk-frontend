import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  client: Client = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
    creationDate: ''
  }

  name: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(private service: ClientService, private toast: ToastrService) { }

  ngOnInit(): void {}

  create(): void{
    this.service.create(this.client).subscribe(() => {
      this.toast.success('Técnico cadastrado com sucesso!', 'Cadastro')
    }, ex => {
      console.log(ex);
      if(ex.error.erros){
        ex.error.errors.array.forEach(element => {
          this.toast.error(element.message);
        });
      }else{
        this.toast.error(ex.error.message);
      }
    })
  }

  addProfile(profile:any): void{

    if(this.client.profiles.includes(profile)){
      this.client.profiles.splice(this.client.profiles.indexOf(profile), 1);
    }else{
      this.client.profiles.push(profile);
    }    
    console.log(this.client.profiles);
    
  }

  validateFields(): boolean{
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid;
  }

}
