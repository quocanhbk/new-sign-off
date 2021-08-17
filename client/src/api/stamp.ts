import baseURL from "api/baseURL"
import getConfig from "api/getConfig"
import axios from "axios"
import { PDFDocument } from "pdf-lib"
import QRCode from "qrcode"
import { CallbackFunction } from "types"

const generateQR = async (text: string, callback: CallbackFunction = () => {}) => {
    callback(100)
    try {
        return await QRCode.toDataURL(text)
    } catch (err) {
        return ""
    }
}

export const downloadStampedPDF = async (fileUrl: string, requestId: number, callback: CallbackFunction = () => {}) => {
    const bytes = await fetch(fileUrl).then((res) => res.arrayBuffer())
    const loadedPDF = await PDFDocument.load(bytes)
    const hashMessage = await getQRText(requestId)

    //QR Code
    const qrCodeB64 = await generateQR(hashMessage)
    const embededQR = await loadedPDF.embedPng(qrCodeB64)

    const pages = loadedPDF.getPages()
    for (const page of pages) {
        const { width, height } = page.getSize()
        page.drawImage(embededQR, {
            height: 48,
            width: 48,
            x: width - 48 - 8, // yes I'm not retarded it's just for clarity
            y: height - 48 - 8,
        })
    }
    const pdfBytes = await loadedPDF.save()
    downloadBytes(pdfBytes, "application/pdf")
    callback(100)
}

const downloadBytes = (arrayBuffer: Uint8Array, type: string, callback: CallbackFunction = () => {}) => {
    const blob = new Blob([arrayBuffer], { type: type })
    const url = URL.createObjectURL(blob)
    window.open(url)
    callback(100)
}

const getQRText = async (requestId: number, callback: CallbackFunction = () => {}) => {
    const config = await getConfig()
    const res = await axios.get(`${baseURL}/api/v1/requests/${requestId}/signed-content`, config)
    callback(100)
    return res.data.text
}
