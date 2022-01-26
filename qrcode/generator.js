const QRCode = require('qrcode');


const QrGenerate =  async text => {
    try {
        const qr = await QRCode.toDataURL(text);
        return qr;
    } catch (err) {
        console.log(err)
    }
}



module.exports = QrGenerate; 
