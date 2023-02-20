import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  title: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  priority: FormControl = new FormControl(null, [Validators.required])
  technician: FormControl = new FormControl(null, [Validators.required])
  client: FormControl = new FormControl(null, [Validators.required])
  note: FormControl = new FormControl(null, [Validators.required])

  constructor() { }

  ngOnInit(): void {
  }

  validateFields():boolean{
    return this.title.valid && this.status.valid && this.priority.valid &&
    this.technician.valid && this.client.valid && this.note.valid
  }
}
