import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { Technician } from 'src/app/models/technician';
import { ClientService } from 'src/app/services/client.service';
import { RequestService } from 'src/app/services/request.service';
import { TechnicianService } from 'src/app/services/technician.service';
import { Request } from 'src/app/models/request';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = {
    priority: '',
    status: '',
    title: '',
    note: '',
    technician: '',
    client: '',
    tecName: '',
    clientName: ''
  }
  clients: Client[] = [];
  technicians: Technician[] = [];

  title: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  priority: FormControl = new FormControl(null, [Validators.required])
  technician: FormControl = new FormControl(null, [Validators.required])
  client: FormControl = new FormControl(null, [Validators.required])
  note: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private requestService: RequestService, private clientService: ClientService, 
    private techService: TechnicianService, private toastService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.findClients();
    this.findTechs();
  }

  create(){
    this.requestService.create(this.request).subscribe(res => {
      this.toastService.success('Chamado criado com sucesso', 'Novo chamado')
      this.router.navigate(['request'])
    }, ex => this.toastService.error(ex.error.error))
  }

  findClients(): void {
    this.clientService.findAll().subscribe(res => {this.clients = res})
  }

  findTechs(): void {
    this.techService.findAll().subscribe(res => {this.technicians = res})
  }


  validateFields():boolean{
    return this.title.valid && this.status.valid && this.priority.valid &&
    this.technician.valid && this.client.valid && this.note.valid
  }
}
