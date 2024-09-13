import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
import { PDFDocument, rgb } from 'pdf-lib';
import * as bwipjs from 'bwip-js';

@Injectable()
export class SvgBarcodeService {
  private execAsync = promisify(exec);

  async convertSvgToPdf(inputPath: string, outputPath: string): Promise<void> {
    try {
      const inputFilePath = path.resolve(inputPath);
      const outputFilePath = path.resolve(outputPath);

      const inkscapePath = '"C:\\Program Files\\Inkscape\\bin\\inkscape.exe"';
      const command = `${inkscapePath} "${inputFilePath}" --export-filename="${outputFilePath}"`;

      await this.execAsync(command);
      console.log(`Conversion successful: ${outputFilePath}`);
    } catch (error) {
      console.error('Error converting SVG to PDF:', error.message);
      throw new Error('Conversion failed');
    }
  }

  
  async generateBarcodeImage(text: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      bwipjs.toBuffer({
        bcid: 'code128',       
        text: text,            
        scale: 3,              
        height: 10,            
        includetext: true,     
        textxalign: 'center',  
      }, (err, png) => {
        if (err) {
          reject(err);
        } else {
          resolve(png);  
        }
      });
    });
  }

  async addBarcodeToPdf(pdfPath: string, barcodeBuffer: Buffer, outputPdfPath: string): Promise<void> {
    try {
      const pdfBytes = await fs.promises.readFile(pdfPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const [page] = pdfDoc.getPages();

     
      const barcodeImage = await pdfDoc.embedPng(barcodeBuffer);

      page.drawImage(barcodeImage, {
        x: 50,
        y: 50,
        width: 200,   
        height: 100,  
      });

      const updatedPdfBytes = await pdfDoc.save();
      await fs.promises.writeFile(outputPdfPath, updatedPdfBytes);
      console.log(`PDF updated with barcode: ${outputPdfPath}`);
    } catch (error) {
      console.error('Error adding barcode to PDF:', error.message);
      throw new Error('Operation failed');
    }
  }

  async addBarcodeAndConvertToPdf(svgInputPath: string, barcodeText: string, finalOutputPath: string): Promise<void> {
    try {
      const tempPdfPath = path.join(path.dirname(svgInputPath), 'temp.pdf');
      await this.convertSvgToPdf(svgInputPath, tempPdfPath);    
      const barcodeBuffer = await this.generateBarcodeImage(barcodeText); 
      await this.addBarcodeToPdf(tempPdfPath, barcodeBuffer, finalOutputPath);
    } catch (error) {
      console.error('Error in the process:', error.message);
      throw new Error('Operation failed');
    }
  }
}


// import { Injectable } from '@nestjs/common';
// import { exec } from 'child_process';
// import * as path from 'path';
// import { promisify } from 'util';
// import * as fs from 'fs';
// import { PDFDocument, rgb } from 'pdf-lib';

// @Injectable()
// export class SvgBarcodeService {
//   private execAsync = promisify(exec);

//   async convertSvgToPdf(inputPath: string, outputPath: string): Promise<void> {
//     try {
//       const inputFilePath = path.resolve(inputPath);
//       const outputFilePath = path.resolve(outputPath);

//       // Full path to Inkscape executable
//       const inkscapePath = '"C:\\Program Files\\Inkscape\\bin\\inkscape.exe"';

//       // Inkscape command to convert SVG to PDF
//       const command = `${inkscapePath} "${inputFilePath}" --export-filename="${outputFilePath}"`;

//       // Execute the conversion command
//       await this.execAsync(command);
//       console.log(`Conversion successful: ${outputFilePath}`);
//     } catch (error) {
//       console.error('Error converting SVG to PDF:', error.message);
//       throw new Error('Conversion failed');
//     }
//   }

//   async addBarcodeToPdf(pdfPath: string, barcodeImagePath: string, outputPdfPath: string): Promise<void> {
//     try {
//       const pdfBytes = await fs.promises.readFile(pdfPath);
//       const barcodeBytes = await fs.promises.readFile(barcodeImagePath);

//       const pdfDoc = await PDFDocument.load(pdfBytes);
//       const [page] = pdfDoc.getPages();

//       // Embed the barcode image
//       const barcodeImage = await pdfDoc.embedPng(barcodeBytes);

//       // Add barcode image to the page
//       page.drawImage(barcodeImage, {
//         x: 50,
//         y: 50,
//         width: 100,
//         height: 50,
//       });

//       // Save the updated PDF
//       const updatedPdfBytes = await pdfDoc.save();
//       await fs.promises.writeFile(outputPdfPath, updatedPdfBytes);
//       console.log(`PDF updated with barcode: ${outputPdfPath}`);
//     } catch (error) {
//       console.error('Error adding barcode to PDF:', error.message);
//       throw new Error('Operation failed');
//     }
//   }

//   async addBarcodeAndConvertToPdf(svgInputPath: string, barcodeImagePath: string, finalOutputPath: string): Promise<void> {
//     try {
//       const tempPdfPath = path.join(path.dirname(svgInputPath), 'temp.pdf');
      
//       // Convert SVG to PDF
//       await this.convertSvgToPdf(svgInputPath, tempPdfPath);

//       // Add barcode to PDF
//       await this.addBarcodeToPdf(tempPdfPath, barcodeImagePath, finalOutputPath);
//     } catch (error) {
//       console.error('Error in the process:', error.message);
//       throw new Error('Operation failed');
//     }
//   }
// }









// import { Injectable } from '@nestjs/common';
// import { exec } from 'child_process';
// import * as path from 'path';
// import { promisify } from 'util';
// import * as fs from 'fs';

// @Injectable()
// export class SvgBarcodeService {
//   // Promisified exec to use async/await
//   private execAsync = promisify(exec);

//   async addTextToSvg(inputPath: string, text: string): Promise<string> {
//     const inputFilePath = path.resolve(inputPath);
    
//     // Check if input .svg file exists
//     if (!fs.existsSync(inputFilePath)) {
//       throw new Error(`Input SVG file not found: ${inputFilePath}`);
//     }

//     // Read SVG content
//     const svgContent = await fs.promises.readFile(inputFilePath, 'utf-8');

//     // Add static text to SVG content (position and styling can be modified as needed)
//     const newText = `<text x="50" y="50" font-size="30" fill="black">${text}</text>`;

//     // Insert the new text just before the closing </svg> tag
//     const updatedSvgContent = svgContent.replace('</svg>', `${newText}</svg>`);

//     // Write updated SVG content to a temporary file
//     const tempSvgPath = path.join(path.dirname(inputFilePath), 'updated.svg');
//     await fs.promises.writeFile(tempSvgPath, updatedSvgContent, 'utf-8');

//     return tempSvgPath;
//   }

//   async convertAiToPdf(inputPath: string, outputPath: string): Promise<void> {
//     try {
//       const inputFilePath = path.resolve(inputPath);
//       const outputFilePath = path.resolve(outputPath);

//       // Full path to Inkscape executable
//       const inkscapePath = '"C:\\Program Files\\Inkscape\\bin\\inkscape.exe"';

//       // Inkscape command to convert updated SVG to PDF
//       const command = `${inkscapePath} "${inputFilePath}" --export-filename="${outputFilePath}"`;

//       // Execute the conversion command
//       await this.execAsync(command);
//       console.log(`Conversion successful: ${outputFilePath}`);
//     } catch (error) {
//       console.error('Error converting AI to PDF:', error.message);
//       throw new Error('Conversion failed');
//     }
//   }

//   async addTextAndConvertToPdf(inputPath: string, outputPath: string, text: string): Promise<void> {
//     try {
//       // Add static text to the SVG image
//       const updatedSvgPath = await this.addTextToSvg(inputPath, text);

//       // Convert the updated SVG file to PDF
//       await this.convertAiToPdf(updatedSvgPath, outputPath);
//     } catch (error) {
//       console.error('Error in the process:', error.message);
//       throw new Error('Operation failed');
//     }
//   }
// }


// import { Injectable } from '@nestjs/common';
// import { exec } from 'child_process';
// import * as path from 'path';
// import { promisify } from 'util';
// import * as fs from 'fs';

// @Injectable()
// export class SvgBarcodeService {
//   // Promisified exec to use async/await
//   private execAsync = promisify(exec);

//   async convertAiToPdf(inputPath: string, outputPath: string): Promise<void> {
//     try {
//       const inputFilePath = path.resolve(inputPath);
//       const outputFilePath = path.resolve(outputPath);

//       // Check if input .ai file exists
//       if (!fs.existsSync(inputFilePath)) {
//         throw new Error(`Input file not found: ${inputFilePath}`);
//       }

//       // Full path to Inkscape executable
//       const inkscapePath = '"C:\\Program Files\\Inkscape\\bin\\inkscape.exe"';

//       // Inkscape command to convert AI to PDF using full path
//       const command = `${inkscapePath} "${inputFilePath}" --export-filename="${outputFilePath}"`;

//       // Execute the conversion command
//       await this.execAsync(command);
//       console.log(`Conversion successful: ${outputFilePath}`);
//     } catch (error) {
//       console.error('Error converting AI to PDF:', error.message);
//       throw new Error('Conversion failed');
//     }
//   }
// }
