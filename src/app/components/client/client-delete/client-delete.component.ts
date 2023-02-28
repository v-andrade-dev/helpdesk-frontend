import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {
  client: Client = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
    creationDate: ''
  }

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

  delete(): void{
    this.service.delete(this.client.id).subscribe(() => {
      this.toast.success('Cliente deletado com sucesso!', 'Delete')
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

}
