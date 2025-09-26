import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrls: ['./bill-view.component.css']
})
export class BillViewComponent implements OnInit {
  formattedDateTime!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // const rawDate = this.data.createdAt; 
    // const day = rawDate.slice(0, 2);
    // const month = rawDate.slice(2, 4);
    // const year = rawDate.slice(4, 8);
    // const time = rawDate.slice(9, 17); 
    // const amPm = rawDate.slice(17).trim(); 

    // this.formattedDateTime = `${day}-${month}-${year} ${time.slice(0, 5)} ${amPm}`;
  // console.log(this.data,"thisDta");
  
    // const rawDate = new Date(this.data.createdAt);
    // this.formattedDateTime = rawDate.toLocaleString('en-IN', {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   hour12: true
    // });
  
    
  }
 
}
