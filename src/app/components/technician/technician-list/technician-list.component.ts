import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Technician } from 'src/app/models/technician';
import { TechnicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.css']
})
export class TechnicianListComponent implements OnInit {

  ELEMENT_DATA : Technician[] = []

  // importado do angular material - tabela com paginação 
  displayedColumns: string[] = ['id', 'name', 'cpf', 'email', 'actions', 'admin'];
  dataSource = new MatTableDataSource<Technician>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TechnicianService) { }

  ngOnInit(): void {
    this.findAll();
  }
  
  findAll(){
    this.service.findAll().subscribe(res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Technician>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  adminProfile(profile: any): string{
    if(profile == 'ADMIN'){
      return profile;
    }else{
      return '';
    }
  }
}

