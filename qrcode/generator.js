const QRCode = require('qrcode');


const QrGenerate = async text => {
    try {
        const qr = await QRCode.toDataURL(text);
        console.log(qr.toString());
    } catch (err) {
        console.log(err)
    }
}

module.exports = QrGenerate; 
