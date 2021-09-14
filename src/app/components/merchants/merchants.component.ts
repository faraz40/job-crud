import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { SubSink } from 'subsink';
import { MerchantOperationsDialogComponent } from './merchant-operations-dialog/merchant-operations-dialog.component';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss'],
})
export class MerchantsComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  selectedIndex = null;
  displayedColumns: string[] = [
    'name',
    'created_at',
    'phone',
    'city',
    'address',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  merchantList = [];

  constructor(private dataSvc: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMerchants();
  }
  getMerchants(): void {
    this.subs.add(
      this.dataSvc.getMerchantList().subscribe((response) => {
        if (!response) {
          console.log('Something went wrong !');
          return;
        }
        if (response['error']) {
          console.log(response['error']);
          return;
        } else {
          this.merchantList = response;
          console.log(this.merchantList);
          this.instantiateTable();
        }
      })
    );
  }
  instantiateTable(): void {
    this.dataSource = new MatTableDataSource<any>(this.merchantList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openUpdateDialog(merchant_obj: object): void {
    const dialogRef = this.dialog.open(MerchantOperationsDialogComponent, {
      disableClose: true,
      width: '600px',
      data: { dialog_type: 'update_merchant', merchant_obj },
    });
    dialogRef.afterClosed().subscribe((merchant) => {
      if (merchant) {
        this.merchantList.map((m, i) => {
          if (merchant['id'] === m['id']) {
            this.merchantList[i] = merchant;
          }
          this.instantiateTable();
          this.dataSvc.info('Updated successfully');
        });
      }
    });
  }
  openAddMerchantDialog(): void {
    const dialogRef = this.dialog.open(MerchantOperationsDialogComponent, {
      disableClose: true,
      width: '600px',
      data: { dialog_type: 'create_merchant' },
    });
    dialogRef.afterClosed().subscribe((merchant) => {
      if (merchant) {
        this.merchantList.unshift(merchant);
        this.instantiateTable();
        this.dataSvc.info('Created successfully');
      }
    });
  }
  openDeleteDialog(item: object): void {
    this.dataSvc.deleteMerchant(item['id']).subscribe((response) => {
      if (!response) {
        this.dataSvc.error('Something went wrong !');
        return;
      }
      if (response['error']) {
        this.dataSvc.error(response['error']);
        return;
      } else {
        this.merchantList = this.merchantList.filter(
          (el) => el['id'] !== item['id']
        );
        this.dataSvc.info('Deleted successfully.');
        this.instantiateTable();
      }
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
