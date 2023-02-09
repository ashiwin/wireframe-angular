import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FeedData {
	desc: {
		title: string;
		text: string;
	};
	wires: Array < {
		id: number;
		date: string;
		title: string;
		text: string;
	} > ;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	desc: {
		title: string;text: string
	};
	wires: Array < {
		id: number;date: string;title: string;text: string
	} > ;
	displayedWires: Array < {
		id: number;date: string;title: string;text: string
	} > ;
	itemsPerPage = 6;

	constructor(private http: HttpClient) {
		this.desc = {
			title: '',
			text: ''
		};
		this.wires = [];
		this.displayedWires = [];
	}

	ngOnInit() {
		this.http.get < FeedData > ('assets/feed.json').subscribe(data => {
			this.desc = data.desc;
			this.wires = data.wires;
			this.displayedWires = this.wires.slice(0, this.itemsPerPage);
		});
	}

	endOfWires() {
		return this.displayedWires.length >= this.wires.length;
	}

	loadMoreButtonText() {
		return this.endOfWires() ? 'End of feed' : 'Load More';
	}

  loadMoreWires() {
    if (!this.endOfWires()) {
      const startIndex = this.displayedWires.length;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedWires = this.displayedWires.concat(this.wires.slice(startIndex, endIndex));
    }
  }
}
