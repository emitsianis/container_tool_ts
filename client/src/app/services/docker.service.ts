import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Container } from '../models/container';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DockerService {
  containersChanged = new Subject<Container[]>();
  constructor(private http: HttpClient) {}

  pullImage(formData: { imageName: string }) {
    return this.http.post('/image', formData);
  }

  createContainer(formData: {
    containerName: string;
    imageName: string;
    privatePort: string;
    publicPort: string;
  }) {
    return this.http.post('/containers', formData);
  }

  getContainers() {
    return this.http.get<Container[]>('/containers/?all=true');
  }

  updateContainers() {
    this.getContainers().subscribe(containers => {
      this.containersChanged.next(containers);
    });
  }

  startContainer(id: string) {
    return this.http.get(`/containers/start/${id}`);
  }

  stopContainer(id: string) {
    return this.http.get(`/containers/stop/${id}`);
  }

  deleteContainer(id: string) {
    return this.http.delete(`/containers/${id}`);
  }
}
