import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { Technician } from 'src/app/models/technician';
import { ClientService } from 'src/app/services/client.service';
import { RequestService } from 'src/app/services/request.service';
import { TechnicianService } from 'src/app/services/technician.service';
import { Request } from 'src/app/models/request';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-update',
  templateUrl: './request-update.component.html',
  styleUrls: ['./request-update.component.css']
})
export class RequestUpdateComponent implements OnInit {
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
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.request.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findClients();
    this.findTechs();
  }

  findById(): void{
    this.requestService.findById(this.request.id).subscribe(res => {
      this.request = res;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  update(){
    this.requestService.create(this.request).subscribe(res => {
      this.toastService.success('Chamado atualizado com sucesso', 'chamado atualizado')
      this.router.navigate(['request'])
    }, ex => this.toastService.error(ex.error.error))
  }

  findClients(): void {
    this.clientService.findAll().subscribe(res => {this.clients = res})
  }

  findTechs(): void {
    this.techService.findAll().subscribe(res => {this.technicians = res})
  }

  statusReturn(status: any): string{
    switch (status){
      case 0:
        return 'ABERTO'
      case 1:
        return 'EM ANDAMENTO'
      case 2:
        return 'FECHADO'
      default:
        return ''
    }
  } 

  priorityReturn(priority: any): string{
    switch (priority){
      case 0:
        return 'BAIXA'
      case 1:
        return 'MÉDIA'
      case 2:
        return 'ALTA'
      default:
        return ''
    }
  } 

  validateFields():boolean{
    return this.title.valid && this.status.valid && this.priority.valid &&
    this.technician.valid && this.client.valid && this.note.valid
  }
}

