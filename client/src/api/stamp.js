import baseURL from 'api/baseURL';
import getConfig from 'api/getConfig';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import QRCode from 'qrcode';

const generateQR = async (text) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    return ""
  }
};

export const downloadStampedPDF = async (fileUrl, requestId) => {
  console.log('debug');
  const bytes = await fetch(fileUrl).then((res) => res.arrayBuffer());
  const loadedPDF = await PDFDocument.load(bytes);
  const hashMessage = await getQRText(requestId);

  //QR Code
  const qrCodeB64 = await generateQR(hashMessage);
  const embededQR = await loadedPDF.embedPng(qrCodeB64);

  const pages = loadedPDF.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawImage(embededQR, {
      height: 48,
      width: 48,
      x: width - 48 - 8, // yes I'm not retarded it's just for clarity
      y: height - 48 - 8,
    });
  }
  const pdfBytes = await loadedPDF.save();
  downloadBytes(pdfBytes, 'application/pdf');
};

const downloadBytes = (arrayBuffer, type) => {
  const blob = new Blob([arrayBuffer], { type: type });
  const url = URL.createObjectURL(blob);
  window.open(url);
};

const getQRText = async (requestId) => {
  const config = await getConfig();
  const res = await axios.get(`${baseURL}/api/v1/requests/${requestId}/signed-content`, config);
  return res.data.text;
}