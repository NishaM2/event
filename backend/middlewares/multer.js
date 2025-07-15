const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define directories
const posterDir = 'uploads/event-posters';
const pdfDir = 'uploads/event-pdfs';

// Ensure directories exist
if (!fs.existsSync(posterDir)) {
    fs.mkdirSync(posterDir, { recursive: true });
}
if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
}

// Dynamic storage based on fieldname
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "poster") {
            cb(null, posterDir);
        } else if (file.fieldname === "infopdf") {
            cb(null, pdfDir);
        } else {
            cb(new Error("Invalid fieldname"), false);
        }
    },
    filename: function (req, file, cb) {
        const eventId = req.params.eventId || "event";
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, `${eventId}-${uniqueName}`);
    }
});

// File filter for poster and PDF
const fileFilter = function (req, file, cb) {
    const extn = path.extname(file.originalname).toLowerCase();

    if (file.fieldname === "poster") {
        const allowed = ['.jpg', '.jpeg', '.png'];
        if (!allowed.includes(extn)) {
            return cb(new Error("Only jpg, jpeg, png files are allowed for posters"), false);
        }
    } else if (file.fieldname === "infopdf") {
        if (extn !== '.pdf') {
            return cb(new Error("Only PDF files are allowed for infopdf"), false);
        }
    } else {
        return cb(new Error("Unknown field name"), false);
    }

    cb(null, true);
};

// Combined multer upload for both poster and pdf
const uploadEventFiles = multer({ storage, fileFilter });

module.exports = { uploadEventFiles };
