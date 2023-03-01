import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technician } from 'src/app/models/technician';
import { TechnicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-technician-create',
  templateUrl: './technician-create.component.html',
  styleUrls: ['./technician-create.component.css']
})
export class TechnicianCreateComponent implements OnInit {

  technician: Technician = {
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

  constructor(private service: TechnicianService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {}

  create(): void{
    this.service.create(this.technician).subscribe(() => {
      this.toast.success('Técnico cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['technician']);
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

    if(this.technician.profiles.includes(profile)){
      this.technician.profiles.splice(this.technician.profiles.indexOf(profile), 1);
    }else{
      this.technician.profiles.push(profile);
    }    
    console.log(this.technician.profiles);
    
  }

  validateFields(): boolean{
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid;
  }

}
