const qr = require('qr-image');
const fs = require('fs');

async function getUserInput() {
  const inquirer = await import('inquirer');
  return inquirer.default.prompt([
      {
          name: 'url',
          type: 'input',
          message: 'Please enter the url of the QR code desired:'
      }
  ]);
}

async function generateQRCode() {
    try {
        const userInput = await getUserInput();
        const url = userInput.url;
        const qrCode = qr.image(url, { type: 'png' });
        
        const outputFileName = 'QRCode.png';
        const outputStream = fs.createWriteStream(outputFileName);
        qrCode.pipe(outputStream);

        outputStream.on('finish', () => {
            console.log(`QR code saved as ${outputFileName}`);
        });

        const txtFileName = 'UserInput.txt';
        fs.writeFile(txtFileName, url, (err) => {
            if (err) throw err;
            console.log(`User input saved to ${txtFileName}`);
        });

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

generateQRCode();
