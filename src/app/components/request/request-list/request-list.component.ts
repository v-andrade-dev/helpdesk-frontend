import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Request } from 'src/app/models/request';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  ELEMENT_DATA : Request[] = []
  FILTERED_DATA : Request[] = []


  // importado do angular material - tabela com paginação 
  displayedColumns: string[] = ['id', 'title', 'clientName', 'tecName', 'open_date', 'priority', 'status', 'actions'];
  dataSource = new MatTableDataSource<Request>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: RequestService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() : void{
    this.service.findAll().subscribe(res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Request>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  statusReturn(status: any): string{
    switch (status){
      case 0:
        return 'ABERTO'
      case 1:
        return 'ANDAMENTO'
      case 2:
        return 'ENCERRADO'
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

  orderByStatus(status: any):void {
    let list: Request[] = [];
    this.ELEMENT_DATA.forEach(element =>{
      if(element.status == status){
        list.push(element);
      }})
      this.FILTERED_DATA = list;
      this.dataSource = new MatTableDataSource<Request>(this.FILTERED_DATA);
      this.dataSource.paginator = this.paginator;
  }

  orderByPriority(priority: any):void {
    let list: Request[] = [];
    this.ELEMENT_DATA.forEach(element =>{
      if(element.priority == priority){
        list.push(element);
      }})
      this.FILTERED_DATA = list;
      this.dataSource = new MatTableDataSource<Request>(this.FILTERED_DATA);
      this.dataSource.paginator = this.paginator;
  }

}
