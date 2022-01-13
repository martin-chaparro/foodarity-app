const cloudinary = require('cloudinary').v2;
const Donation = require('../models/Donation');
const User = require('../models/User');
const Company = require('../models/Company');
const Category = require('../models/Category');

cloudinary.config(process.env.CLOUDINARY_URL);
// un comercio puede postear una donacion
const postDonation = async (req, res) => {
  const { userId } = req;
  const { lote, description, quantity } = req.body;
  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Company }, { model: Category }],
    });
    if (!user.CompanyId) {
      return res.status(401).json({ msg: 'El usuario no posee un comercio' });
    }
    if (user.Company.type_id !== 1) {
      return res.status(401).json({
        msg: 'Solo las companias tipo comercio pueden realizar donaciones',
      });
    }
    if (user.Company.status !== 'Habilitada') {
      return res.status(401).json({
        msg: 'Solo los comercios habilitados pueden realizar donaciones',
      });
    }
    const newDonation = await Donation.create({
      lote,
      description,
      quantity,
    });

    await newDonation.setCommerce(user.Company);
    await newDonation.setPublisher(userId);

    return res.status(200).json(newDonation);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// un comercio puede subir o actualizar imagen del producto donado
const uploadPhotoDonation = async (req, res) => {
  const { id } = req.params;
  const foundDonation = await Donation.findByPk(id);

  if (foundDonation.photo) {
    cloudinary.uploader.destroy(foundDonation.photo.public_id);
  }

  const { tempFilePath } = req.files.file;

  const { secure_url: secureUrl, public_id: publicId } =
    await cloudinary.uploader.upload(tempFilePath);

  await foundDonation.update({
    photo: { public_id: publicId, url: secureUrl },
  });

  return res.status(200).json(foundDonation);
};

// una ONG puede ver las donaciones recibidas
const getDonations = async (req, res) => {
  try {
    const listDonations = await Donation.findAll({
      include: [
        { model: Company, as: 'commerce' },
        { model: User, as: 'publisher' },
        { model: Category, as: 'category' },
      ],
    });
    return res.status(200).json(listDonations);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  postDonation,
  uploadPhotoDonation,
  getDonations,
};
