import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { BillViewComponent } from './bill-view/bill-view.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  items = [
    {
      itemName: '',
      quantity: 0,
      mrp: 0,
      gst: 0,
      batchNo: '-',
      hsn: '-',
      expiryDate: '-',
      totalAmount: 0,
    },
  ];

  productSuggestions: any[] = [];
  editingRow: number | null = null;
  gst!: number;
  totalAmount: number = 0;
  totalDiscount: number = 0;
  finalAmount: number = 0;
  customerName: string = '';
  customerNumber: string = '';
  globalSearchQuery: string = '';
  globalProductSuggestions: any[] = [];
  selectedGlobalProduct: any = null;

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onItemNameChange(rowIndex: number, itemName: string): void {
    this.editingRow = rowIndex;
    if (itemName.length > 0) {
      this.productService.searchProducts(itemName).subscribe({
        next: (data) => {
          this.productSuggestions = data;
        },
        error: (error) => {
          console.error('Error fetching product suggestions:', error);
        },
      });
    } else {
      this.productSuggestions = [];
      this.items[rowIndex].quantity = 0;
    }
  }

  selectProduct(rowIndex: number, suggestion: any): void {
    const selectedItem = suggestion;
    const selectedRow = this.items[rowIndex];
    selectedRow.itemName = selectedItem.itemName;
    selectedRow.mrp = selectedItem.mrp;
    console.log(selectedRow.mrp, 'rowww');
    selectedRow.gst = (selectedItem.mrp * selectedItem.gst) / 100;
    console.log(selectedRow.gst, 'gsttt');
    selectedRow.batchNo = selectedItem.batchNo;
    selectedRow.hsn = selectedItem.hsn;
    selectedRow.expiryDate = selectedItem.expiryDate;
    selectedRow.totalAmount = selectedItem.mrp * selectedRow.quantity;
    selectedRow.quantity = 1;
    this.addNewEmptyRow();
    this.calculateTotalAmount(rowIndex);
    this.productSuggestions = [];
  }

  addNewEmptyRow(): void {
    this.items.push({
      itemName: '',
      quantity: 0,
      mrp: 0,
      gst: 0,
      batchNo: '-',
      hsn: '-',
      expiryDate: '-',
      totalAmount: 0,
    });
  }

  calculateTotalAmount(rowIndex: number): void {
    const item = this.items[rowIndex];
    if (item.quantity && item.mrp) {
      console.log(this.gst, 'BBBBBgsttt22222');
      this.gst = 0;
      this.gst = item.gst * item.quantity;
      console.log(this.gst, 'gsttt22222');
      item.totalAmount = item.quantity * item.mrp + this.gst;
      console.log(item.totalAmount, 'totalllll');
      this.calculateTotals();
    }
  }

  deleteRow(rowIndex: number): void {
    this.items.splice(rowIndex, 1);
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalAmount = this.items.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );
    this.totalDiscount = (this.totalAmount * 5) / 100;
    this.finalAmount = this.totalAmount - this.totalDiscount;
  }

  isBillable(): boolean {
    const hasValidProducts = this.items.some(
      (item) => item.itemName.trim() !== '' && item.quantity > 0
    );
    return hasValidProducts && this.customerName.trim() !== '';
  }

  addBill(): void {
    const validItems = this.items.filter(
      (item) => item.itemName.trim() !== '' && item.quantity > 0
    );

    if (validItems.length === 0) {
      alert('No valid products to bill!');
      return;
    }

    const billData = {
      customerName: this.customerName,
      customerNumber: this.customerNumber,
      details: validItems.map((item) => ({
        itemName: item.itemName,
        quantity: item.quantity,
        totalAmount: item.totalAmount,
      })),
      finalAmount: this.finalAmount,
    };

    this.productService.addBill(billData).subscribe({
      next: (response) => {
        console.log(response);
        const { id: billId, createdAt } = response;
        this.reduceProductQuantities();

        this.dialog.open(BillViewComponent, {
          disableClose: true,
          width: '80%',
          height: '70vh',
          data: {
            customerName: this.customerName,
            customerNumber: this.customerNumber,
            items: validItems,
            totalAmount: this.totalAmount,
            totalDiscount: this.totalDiscount,
            finalAmount: this.finalAmount,
            billId: billId,
            createdAt: createdAt,
          },
        });

        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding bill:', error);
        alert('Failed to add bill. Please try again.');
      },
    });
  }

  reduceProductQuantities(): void {
    const itemsToReduce = this.items.filter((item) => item.quantity > 0);

    this.productService.reduceProductQuantities(itemsToReduce).subscribe({
      next: (response) => {
        console.log('Product quantities reduced successfully:', response);
        alert('Product quantities updated successfully!');
      },
      error: (error) => {
        console.error('Error reducing quantities:', error);
        alert('Failed to update product quantities.');
      },
    });
  }

  resetForm(): void {
    this.customerName = '';
    this.customerNumber = '';
    this.items = [
      {
        itemName: '',
        quantity: 0,
        mrp: 0,
        gst: 0,
        batchNo: '-',
        hsn: '-',
        expiryDate: '-',
        totalAmount: 0,
      },
    ];
    this.totalAmount = 0;
    this.totalDiscount = 0;
    this.finalAmount = 0;
  }

  restrictToNumbers(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const key = event.key;

    if (!/^[0-9]$/.test(key) && !allowedKeys.includes(key)) {
      event.preventDefault();
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onGlobalSearchChange(query: string): void {
    if (query.length > 0) {
      this.productService.searchProducts(query).subscribe({
        next: (data) => {
          this.globalProductSuggestions = data;
        },
        error: (error) => {
          console.error('Error fetching global product suggestions:', error);
        },
      });
    } else {
      this.globalProductSuggestions = [];
    }
  }

  selectGlobalProduct(product: any): void {
    this.selectedGlobalProduct = product;
    this.globalProductSuggestions = [];
  }
}
