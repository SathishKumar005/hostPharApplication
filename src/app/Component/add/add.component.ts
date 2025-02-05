import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  addProductForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      batchNo: ['', Validators.required],
      hsnCode: ['', Validators.required],
      expiryDate: ['', Validators.required],
      gst: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      this.productService.addProduct(this.addProductForm.value).subscribe({
        next: (response) => {
          console.log('Product added successfully', response);
          this.addProductForm.reset({
            name: '',
            quantity: '',
            price: '',
            batchNo: '',
            hsnCode: '',
            expiryDate: '',
            gst: '',
          });
        },
        error: (error) => {
          console.error('Error adding product', error);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
