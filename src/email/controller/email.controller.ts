import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { EmailService } from '../../email/service/email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() body: { nombre: string; email: string }) {
    const { nombre, email } = body;

    if (!nombre || !email) {
      throw new HttpException(
        'Nombre y email son requeridos',
        HttpStatus.BAD_REQUEST
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new HttpException(
        'Formato de email inválido',
        HttpStatus.BAD_REQUEST
      );
    }

    if (nombre.length < 2 || nombre.length > 100) {
      throw new HttpException(
        'El nombre debe tener entre 2 y 100 caracteres',
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      const result = await this.emailService.sendEmail(email, nombre);
      return {
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new HttpException(
        `Error enviando email: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  @Post('test')
  async testEmailService() {
    try {
      const result = await this.emailService.sendEmail(
        'test@example.com',
        'Usuario de Prueba'
      );
      
      return {
        success: true,
        message: 'Servicio de email funcionando correctamente',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error en servicio de email: ${error.message}`,
        help: 'Verifica tu configuración SMTP en el archivo .env',
      };
    }
  }
}
