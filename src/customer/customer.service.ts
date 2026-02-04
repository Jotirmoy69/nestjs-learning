import { Injectable } from '@nestjs/common';
import { customer } from './interfaces/customer.interface';
import { createCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  private customers: customer[] = [
    { name: 'Jotirmoy', email: 'jotirmoy@.com', age: 20 },
    { name: 'Rahul', email: 'rahul@.com', age: 21 },
    { name: 'Rohit', email: 'rohit@.com', age: 22 },
    { name: 'Sachin', email: 'sachin@.com', age: 23 },
    { name: 'Virat', email: 'virat@.com', age: 24 },
    { name: 'Dhoni', email: 'dhoni@.com', age: 25 },
  ];

  getAllCustomers(): customer[] {
    return this.customers;
  }

  addCustomers(createCustomerDto: createCustomerDto) {
    const customer = {
      id: Date.now(),
      ...createCustomerDto,
    };

    this.customers.push(customer);
    return customer;
  }
}
