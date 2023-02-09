import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FeedData {
  desc: {
    title: string;
    text: string;
  };
  wires: Array<{
    id: number;
    date: string;
    title: string;
    text: string;
  }>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  desc: { title: string; text: string };
  wires: Array<{ id: number; date: string; title: string; text: string }>;

  constructor(private http: HttpClient) {
    this.desc = { title: '', text: '' };
    this.wires = [];
  }

  ngOnInit() {
    this.http.get<FeedData>('assets/feed.json').subscribe(data => {
      this.desc = data.desc;
      this.wires = data.wires;
    });
  }
}
