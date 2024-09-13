import { Module } from '@nestjs/common';
import { SvgBarcodeService } from './placer/service/service.service';
import { SvgBarcodeController } from './placer/controller/controller.controller';

@Module({
  imports: [],
  controllers: [SvgBarcodeController],
  providers: [SvgBarcodeService],
})
export class AppModule {}
