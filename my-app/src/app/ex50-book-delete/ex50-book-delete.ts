import { Component } from '@angular/core';
import { Ex50Bookapi } from '../ex50-bookapi';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ex50-book-delete',
  standalone: false,
  templateUrl: './ex50-book-delete.html',
  styleUrl: './ex50-book-delete.css',
})
export class Ex50BookDelete {
id!: string

  constructor(
    private route: ActivatedRoute,
    private api: Ex50Bookapi,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
  }

  confirmDelete() {
    this.api.deleteBook(this.id).subscribe(() => {
      this.router.navigate(['/ex-50'])
    })
  }

  cancel() {
    this.router.navigate(['/ex-50'])
  }
}
