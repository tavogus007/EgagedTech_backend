import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
  }

  async sendEmail(to: string, nombre: string) {
    const info = await this.transporter.sendMail({
      from: this.configService.get('EMAIL_USER'),
      to,
      subject: 'Saludos desde NestJS',
      text: `Hola ${nombre}, este es un correo enviado desde tu app Angular con NestJS`,
    });

    return info;
  }
}
