const certificate = require('pdfkit')
const fs = require('fs')

const certificateGenerator = async (user,event, filePath) => {
    return new Promise((resolve, reject) => {
        const doc = new certificate({
            size: 'A4',
            layout: 'landscape'
        })

        const stream = fs.createWriteStream(filePath)
        doc.pipe(stream)

        doc.rect(0, 0, doc.page.width,doc.page.height).fill('#fff');

        doc.fillColor("#000")
            .fontSize(30)
            .text("Certificate of Participation", {align: 'center'})
        
        doc.moveDown()
        .fontSize(20)
        .text(`${user.name}`, {align: "center"})

        doc.moveDown()
        .fontSize(16)
        .text(`has participated in ${event.title}`, {align: "center"})

        doc.moveDown()
            .fontSize(12)
            .text(`Date: ${event.date}`, {align: "center"})

        doc.end()

        stream.on("finish", resolve)
        stream.on("error", reject)
    })
}

module.exports = { certificateGenerator }
    