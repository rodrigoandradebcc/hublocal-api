import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() body: SignInDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtGuard)
  @Get('test')
  testLogin() {
    return 'lerolero';
  }
}
