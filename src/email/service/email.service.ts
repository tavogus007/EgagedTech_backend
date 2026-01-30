import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
    this.verifyConnection();
  }

  private async verifyConnection() {
    try {
      await this.transporter.verify();
      this.logger.log('✅ Conexión SMTP verificada correctamente');
    } catch (error) {
      this.logger.error('❌ Error verificando conexión SMTP:', error.message);
      this.logger.warn('Asegúrate de:');
      this.logger.warn('1. Tener verificación en 2 pasos ACTIVADA en Google');
      this.logger.warn('2. Usar una CONTRASEÑA DE APLICACIÓN, no tu contraseña normal');
      this.logger.warn('3. Permitir aplicaciones menos seguras si no usas verificación en 2 pasos');
    }
  }

  async sendEmail(to: string, nombre: string) {
    const info = await this.transporter.sendMail({
      from: this.configService.get('EMAIL_USER'),
      to,
      subject: 'Saludos desde NestJS',
      text: `Hola ${nombre}, prueba de EngagedTech completada con exito!`,
    });

    return info;
  }
}
