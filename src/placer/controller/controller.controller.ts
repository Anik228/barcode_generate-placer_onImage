import { Controller, Get } from '@nestjs/common';
import { SvgBarcodeService } from '../service/service.service';

@Controller('convert')
export class SvgBarcodeController {
  constructor(private readonly svgBarcodeService: SvgBarcodeService) {}

  @Get()
  async convertSvgToPdf() {
    const svgInputPath = 'D:/DIVERGENT/bkash_bar_code_placer/2 Banner Medium Priyo_new.svg';
    const outputPdfPath = 'D:/DIVERGENT/bkash_bar_code_placer/output/output.pdf';
    const barcodeText = '1234567890'; 

    try {
      await this.svgBarcodeService.addBarcodeAndConvertToPdf(svgInputPath, barcodeText, outputPdfPath);
      return { message: 'Barcode successfully generated and added to PDF' };
    } catch (error) {
      return { message: 'Conversion failed', error: error.message };
    }
  }
}

// import { Controller, Get } from '@nestjs/common';
// import { SvgBarcodeService } from '../service/service.service';

// @Controller('convert')
// export class SvgBarcodeController {
//   constructor(private readonly svgBarcodeService: SvgBarcodeService) {}

//   @Get()
//   async convertSvgToPdf() {
//     const svgInputPath = 'D:/DIVERGENT/bkash_bar_code_placer/2 Banner Medium Priyo_new.svg';
//     const outputPdfPath = 'D:/DIVERGENT/bkash_bar_code_placer/output/output.pdf';
//     const barcodeImagePath = 'D:/DIVERGENT/bkash_bar_code_placer/barcode.png';  // Path to the barcode image

//     try {
//       await this.svgBarcodeService.addBarcodeAndConvertToPdf(svgInputPath, barcodeImagePath, outputPdfPath);
//       return { message: 'Barcode successfully added to PDF' };
//     } catch (error) {
//       return { message: 'Conversion failed', error: error.message };
//     }
//   }
// }



// import { Controller, Get } from '@nestjs/common';
// import { SvgBarcodeService } from '../service/service.service';

// @Controller('convert')
// export class SvgBarcodeController {

//   constructor(private readonly SvgBarcodeService: SvgBarcodeService) {}

//   @Get()
//   async convertAiToPdf() {
//     const inputPath = 'D:/DIVERGENT/bkash_bar_code_placer/2 Banner Medium Priyo_new.svg';
//     const outputPdfPath = 'D:/DIVERGENT/bkash_bar_code_placer/output/output.pdf';
//     const staticText = 'Sample Static Text';

//     try {
//       await this.SvgBarcodeService.addTextAndConvertToPdf(inputPath, outputPdfPath, staticText);
//       return { message: 'SVG file successfully updated with text and converted to PDF' };
//     } catch (error) {
//       return { message: 'Conversion failed', error: error.message };
//     }
//   }
// }



// // src/ai-to-pdf.controller.ts

// import { Controller, Get } from '@nestjs/common';
// import { SvgBarcodeService } from '../service/service.service';

// @Controller('convert')
// export class SvgBarcodeController {

//   constructor(private readonly SvgBarcodeService: SvgBarcodeService) {}

//   @Get()
//   async convertAiToPdf() {
//     const inputPath = 'D:/DIVERGENT/bkash_bar_code_placer/2 Banner Medium Priyo_new.svg';
//     const outputPdfPath = 'D:/DIVERGENT/bkash_bar_code_placer/output/output.pdf';

//     try {
//       await this.SvgBarcodeService.convertAiToPdf(inputPath, outputPdfPath);
//       return { message: 'AI file successfully converted to PDF' };
//     } catch (error) {
//       return { message: 'Conversion failed', error: error.message };
//     }
//   }
// }


// inkscape "D:\DIVERGENT\bkash_bar_code_placer\2 Banner Medium Priyo_new.svg" --export-filename="D:\DIVERGENT\bkash_bar_code_placer\output\output.pdf"


//nkscape "D:\DIVERGENT\bkash_bar_code_placer\2 Banner Medium Priyo_new.svg" --export-filename="D:\DIVERGENT\bkash_bar_code_placer\output\output.pdf"