const cloudinary = require('cloudinary').v2;
const Donation = require('../models/Donation');
const User = require('../models/User');
const Company = require('../models/Company');
const Category = require('../models/Category');


cloudinary.config(process.env.CLOUDINARY_URL);

// un comercio puede postear una donacion
const postDonation = async (req, res) => {
  try {
  const { userId } = req;
  const { lote, description, quantity, category } = JSON.parse(req.body.data);
  const {ongId} = req.params
  
    const user = await User.findByPk(userId)
    console.log(!user.CompanyId)
    const commerce = await Company.findByPk(user.companyId)

    if (!user.CompanyId) {
      return res.status(401).json({ msg: 'El usuario no posee un comercio' });
    }
    if (commerce.type_id !== 1) {
      return res.status(401).json({
        msg: 'Solo las companias tipo comercio pueden realizar donaciones',
      });
    }
    if (commerce.status !== 'Habilitada') {
      return res.status(401).json({
        msg: 'Solo los comercios habilitados pueden realizar donaciones',
      });
    } 
    const ong = await Company.findByPk(ongId)
    if (!ong) {
      return res.status(401).json({ msg: 'La ONG no existe' });
    }
    if (ong.type_id !== 2) {
      return res.status(401).json({ msg: 'Solo las companias tipo ONG pueden recibir donaciones' });
    }
    if(ong.status !== 'Habilitada'){
      return res.status(401).json({
        msg: 'Solo los ONG habilitados pueden recibir donaciones',
      });
    }
 
    const { tempFilePath } = req.files.file;

    const { secure_url: secureUrl, public_id: publicId } =
      await cloudinary.uploader.upload(tempFilePath);

    const photo = { public_id: publicId, url: secureUrl };

    const newDonation = await Donation.create({
      lote,
      description,
      quantity,
      photo
    });

    await newDonation.setCommerce(commerce);
    await newDonation.setOng(ongId);
    await newDonation.setPublisher(userId);
    await newDonation.setCategory(category);

    return res.status(200).json(newDonation);
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};



// una ONG puede ver las donaciones recibidas
const getDonationsByOng = async (req, res) => {
  const ownerId = req.userId;

  const ong = await Company.findByPk(ownerId);
  if(!ong){
    return res.status(401).json({ msg: 'La ONG no existe' });
  }

  if(ong.type_id !== 2){
    return res.status(401).json({
      msg: 'Solo las companias tipo ONG recibir donaciones',
    });
  }

  try {
    const listDonations = await Donation.findAll({
      include: [
        { model: Company, as: 'commerce', attributes: ['areaCode','phone','email','website','banner','status','deleted','ownerId','createAt','updateAt','type_id']},
        { model: User, as: 'publisher',attributes: {
          exclude: [
            'phone',
            'createdAt',
            'updatedAt',
            'password',
            'status',
            'CompanyId',
            'RoleId',
            'role_id',
          ],
        }, },
        { model: Category, as: 'category', attributes: {exclude:[ 'createdAt','updatedAt']}},
      ], attributes: {exclude:['createdAt', 'updatedAt'] },
      order: [['lote', 'ASC']],
    });
    return res.status(200).json(listDonations);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//un comercio puede ver las donaciones hechas
const getDonationsByCommerce = async (req, res) => {
  const ownerId = req.userId;

  try {
  const commerce = await Company.findByPk(ownerId);
  if(!commerce){
    return res.status(401).json({ msg: 'La empresa no existe' });
  }

  if(commerce.type_id !== 1){
    return res.status(401).json({
      msg: 'Solo las empresas pueden realizar esta accion',
    });
  }

    const listDonations = await Donation.findAll({
      include: [
        { model: Company, as: 'ong', attributes: ['areaCode','phone','email','website','banner','status','deleted','ownerId','createAt','updateAt','type_id']},
        { model: Category, as: 'category', attributes: {exclude:[ 'createdAt','updatedAt']}},
      ], attributes: {exclude:['createdAt', 'updatedAt'] },
      order: [['lote', 'ASC']],
      where: {
        commerceId: ownerId,
      },
    });
    return res.status(200).json(listDonations);

  }catch (error) {
    return res.status(500).json({ message: error });
  }

}


module.exports = {
  postDonation,
  getDonationsByOng,
  getDonationsByCommerce,
};
