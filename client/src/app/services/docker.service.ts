import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Container } from '../models/container';

@Injectable({
  providedIn: 'root',
})
export class DockerService {
  constructor(private http: HttpClient) {}

  getContainers() {
    return this.http.get<Container[]>('/containers/?all=true');
  }
}
