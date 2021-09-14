import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-merchant-operations-dialog',
  templateUrl: './merchant-operations-dialog.component.html',
  styleUrls: ['./merchant-operations-dialog.component.scss'],
})
export class MerchantOperationsDialogComponent implements OnInit {
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  subs = new SubSink();

  merchantForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MerchantOperationsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataSvc: DataService
  ) {}

  ngOnInit() {
    this.initializeForms();
  }
  initializeForms(): void {
    if (this.data.dialog_type === 'create_merchant') {
      this.merchantForm = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        phone: ['', Validators.required],
      });
    }
    if (this.data.dialog_type === 'update_merchant') {
      this.merchantForm = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        phone: ['', Validators.required],
      });
      this.merchantForm.controls['name'].setValue(this.data.merchant_obj.name);
      this.merchantForm.controls['address'].setValue(
        this.data.merchant_obj.address
      );
      this.merchantForm.controls['city'].setValue(this.data.merchant_obj.city);
      this.merchantForm.controls['phone'].setValue(
        this.data.merchant_obj.phone
      );
    }
  }
  createMerchant(): void {
    this.subs.add(
      this.dataSvc
        .createMerchant(this.merchantForm.value)
        .subscribe((response) => {
          if (response && response['id']) {
            this.dialogRef.close(response);
          } else if (response && response['error']) {
            this.dataSvc.error(response['error']);
          }
        })
    );
  }
  updateMerchant(): void {
    const obj = this.merchantForm.value;
    obj['id'] = this.data.merchant_obj['id'];
    this.subs.add(
      this.dataSvc.updateMerchant(obj).subscribe((response) => {
        if (response && response['id']) {
          this.dialogRef.close(response);
        } else if (response && response['error']) {
          this.dataSvc.error(response['error']);
        }
      })
    );
  }
}
