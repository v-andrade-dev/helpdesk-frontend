import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  ELEMENT_DATA : Request[] = [
   {
      id: 1,
      open_date: '21/01/2023',
      close_date: '11/02/2023',
      priority: 'ALTA',
      status: 'ANDAMENTO',
      title: 'Chamado 1',
      note: 'Teste chamado 1',
      technician: 2,
      client: 4,
      tecName: 'Vinicius de Andrade',
      clientName: 'Carol Souza',
   }
  ]

  // importado do angular material - tabela com paginação 
  displayedColumns: string[] = ['id', 'title', 'clientName', 'tecName', 'open_date', 'priority', 'status', 'actions'];
  dataSource = new MatTableDataSource<Request>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
