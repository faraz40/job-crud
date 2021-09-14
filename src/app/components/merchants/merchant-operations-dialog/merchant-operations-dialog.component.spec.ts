import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOperationsDialogComponent } from './merchant-operations-dialog.component';

describe('MerchantOperationsDialogComponent', () => {
  let component: MerchantOperationsDialogComponent;
  let fixture: ComponentFixture<MerchantOperationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantOperationsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantOperationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
