import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  bills: any[] = [];
  lowStockItems: any[] = [];
  totalBilledAmount: number = 0;
  defaultTarget: number = 20000;
  progressPercentage: number = 0;
  selectedDetails: any = null;
  progressDashArray: string = '126';
  progressDashOffset: string = '126';

  constructor(private billService: ProductService, private router: Router) {}
 
  ngOnInit(): void {
    this.fetchBilledData();
    this.fetchLowStockItems();
    this.fetchMonthlyBilledAmount();
  }

  fetchBilledData(): void {
    this.billService.getBilledData().subscribe({
      next: (data) => {
        this.bills = data;
        // console.log(this.bills);
      },
      error: (error) => {
        // console.error('Error fetching billed data:', error);
      },
    });
  }

  fetchLowStockItems(): void {
    this.billService.getLowStockItems().subscribe({
      next: (data: any[]) => {
   this.lowStockItems = data.filter(item => item.quantity < 20);
      // console.log('Low stock items:', this.lowStockItems);
        
      },
      error: (error) => {
        // console.error('Error fetching low stock items:', error);
      },
    });
  }

  fetchMonthlyBilledAmount(): void {
    this.billService.getBilledData().subscribe({
      next: (data: any[]) => {
      this.totalBilledAmount = data.reduce((sum, bill) => sum + bill.finalAmount, 0);
      
      // console.log('Total billed amount:', this.totalBilledAmount);
        this.updateProgress();
      },
      error: (err) => {
        // console.error('Error fetching monthly billed amount:', err);
      },
    });
  }

  updateProgress(): void {
    this.progressPercentage = Math.min(
      (this.totalBilledAmount / this.defaultTarget) * 100,
      100
    );
    const maxArcLength = 126;
    this.progressDashOffset = `${
      maxArcLength - (this.progressPercentage / 100) * maxArcLength
    }`;
  }

  viewDetails(details: string): void {
    // console.log("hiii");
    this.selectedDetails = details;
    
    // console.log(details, 'Refffff');
  }

  closeDetails(): void {
    this.selectedDetails = null;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
