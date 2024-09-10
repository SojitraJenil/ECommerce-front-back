const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dvmdeehwt",
  api_key: "594643919336788",
  api_secret: "TtRdeJ_XMcUg_yve6AAMCOfquzo",
});

// Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // Folder in Cloudinary
    format: async (req, file) => "jpeg", // File format (optional)
    public_id: (req, file) => file.originalname.split(".")[0], // Use the original name
  },
});

// Multer middleware
const upload = multer({ storage: storage });

module.exports = upload;
