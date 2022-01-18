const getCart = async (req,res) => {
  try {
    res.status(200)
  } catch (error) {
    res.status(500).json({message: error})
  }
}
const addToCart = async (req,res) => {
  try {
    res.status(200)
  } catch (error) {
    res.status(500).json({message: error})
  }
}
const removeInCart = async (req,res) => {
  try {
    res.status(200)
  } catch (error) {
    res.status(500).json({message: error})
  }
}
const clearCart = async (req,res) => {
  try {
    res.status(200)
  } catch (error) {
    res.status(500).json({message: error})
  }
}

module.exports = {
  getCart, addToCart, removeInCart, clearCart
}