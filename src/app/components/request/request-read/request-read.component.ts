import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/models/request';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-read',
  templateUrl: './request-read.component.html',
  styleUrls: ['./request-read.component.css']
})
export class RequestReadComponent implements OnInit {

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

  constructor(
    private requestService: RequestService, private toastService: ToastrService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.request.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.requestService.findById(this.request.id).subscribe(res => {
      this.request = res;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
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
}
