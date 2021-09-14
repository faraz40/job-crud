import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(public snackBar: MatSnackBar) {}

  add(message: string): void {
    this.snackBar.open(message, '', { duration: 1000 });
  }

  error(message: any, duration: number = null): void {
    const snackBarRef = this.snackBar.open(message, 'Dismiss!', {
      duration: duration ? duration : 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }

  info(message: any): void {
    const snackBarRef = this.snackBar.open(message, 'OK!', { duration: 5000 });

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }
}
