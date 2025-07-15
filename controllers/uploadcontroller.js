const Event = require("../models/eventmodel")

const uploadPoster = async (req, res) => {
    const eventId = req.params.eventId;
    const posterFile = req.files?.poster?.[0];
    if(!posterFile) {
        return res.status(400).json({ 
            message: "no poster uploaded" 
        });
    }

    const posterPath = posterFile.path;

    try {
        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({
                message: "event not found"
            })
        }

        event.poster = posterPath;
        await event.save()

        res.status(200).json({
            message: "poster uploaded successfully",
            filePath: posterPath
        })

    } catch (error) {
        res.status(400).json({
            message: "error uploading poster",error
        })
    }
}

const uploadPdf = async (req, res) => {
    const eventId = req.params.eventId;
    const pdfFile = req.files?.infopdf?.[0];
    if(!pdfFile) {
        return res.status(400).json({
            message: "no pdf uploaded"
        })
    }

    const pdfPath = pdfFile.path

    try {
        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({
                message: "event not found"
            })
        }

        event.infopdf = pdfPath;
        await event.save()

        res.status(200).json({
            message: "infopdf uploaded successfully",
            filePath: pdfPath
        })

    } catch (error) {
        res.status(400).json({
            message: "error uploading infopdf",error
        })
    }
}

module.exports = { uploadPdf, uploadPoster }