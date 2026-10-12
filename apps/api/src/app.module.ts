import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookingModule } from './modules/booking/booking.module';
import { PatientModule } from './modules/patient/patient.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { BillingModule } from './modules/billing/billing.module';
import { AuthModule } from './modules/auth/auth.module';
import { AIModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    BookingModule,
    PatientModule,
    VehicleModule,
    BillingModule,
    AuthModule,
    AIModule,
  ],
})
export class AppModule {}
