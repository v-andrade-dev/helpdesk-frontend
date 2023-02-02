import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Technician } from 'src/app/models/technician';

@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.css']
})
export class TechnicianListComponent implements OnInit {

  ELEMENT_DATA : Technician[] = [
    {
      id:1,
      name: 'Vinicius de Andrade',
      cpf: '123.456.789-82',
      email: 'andrade@mail.com',
      password: '123',
      profile:['0'],
      creationDate: '01/02/2023'
    }
  ]

  // importado do angular material - tabela com paginação 
  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'actions'];
  dataSource = new MatTableDataSource<Technician>(this.ELEMENT_DATA);
  constructor() { }

  ngOnInit(): void {
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



}

