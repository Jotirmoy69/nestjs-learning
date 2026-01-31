import { Body, Controller, Get, Post } from '@nestjs/common';
import { customer } from './interfaces/customer.interface';
import { createCustomerDto } from './dto/customer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService:CustomerService){}

    @Get()
    getAllCustomers():customer[]{
        return this.customerService.getAllCustomers();
    }

    @Post()
    createCustomer(@Body() createCustomerDto:createCustomerDto){
        return this.customerService.addCustomers(createCustomerDto);
    }

}
