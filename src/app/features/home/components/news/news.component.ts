import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Calendar, ArrowRight } from 'lucide-angular';
import { Observable } from 'rxjs';

interface Noticia {
  id: number;
  fecha: string;
  titulo: string;
  resumen: string;
  imagen_url: string;
  contenido: string;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit {
  readonly icons = { Calendar, ArrowRight };
  noticias$: Observable<Noticia[]> | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.noticias$ = this.http.get<Noticia[]>('assets/noticias.json');
  }
}
