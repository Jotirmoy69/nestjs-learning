import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesFromDecor } from 'src/guard/roles/roles.decorator';
import { Roles } from 'src/guard/roles/roles.enums';
import { RolesGuard } from 'src/guard/roles/roles.guard';

@Controller('user-roles')
export class UserRolesController {

    @Get("admin-data")
    @UseGuards(RolesGuard)
    @RolesFromDecor(Roles.ADMIN)
    getUserRoles(){
        return 'got admin roles';
    }

    @Get("user-data")
    @UseGuards(RolesGuard)
    @RolesFromDecor(Roles.USER)
    getUserRoles2(){
        return 'got user roles';
    }
}
