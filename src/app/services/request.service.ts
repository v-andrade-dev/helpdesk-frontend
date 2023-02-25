import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Request>{
    return this.http.get<Request>(`${API_CONFIG.baseUrl}/request/${id}`)
  }

  findAll() : Observable<Request[]>{
    return this.http.get<Request[]>(`${API_CONFIG.baseUrl}/request`)
  }

  create(request: Request): Observable<Request>{
    return this.http.post<Request>(`${API_CONFIG.baseUrl}/request`, request)
  }

  update(request: Request): Observable<Request>{
    return this.http.put<Request>(`${API_CONFIG.baseUrl}/request/${request.id}`, request)
  }
}
