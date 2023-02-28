import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {

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

  constructor(private service: ClientService, private toast: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.client.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById():void{
    this.service.findById(this.client.id).subscribe(res => {
      res.profiles = [];
      this.client = res;
    });
  }

  update(): void{
    this.service.update(this.client).subscribe(() => {
      this.toast.success('Informações alteradas com sucesso!', 'Update')
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

  validateFields(): boolean{
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid;
  }

}
