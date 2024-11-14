import { User } from "../models/userModel.js"

// GET USER INFO
export const getUserController = async(req, res) => {
    try {
        // * find user
        const user = await User.findById(req.body.id)
        // Validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        // * Hide user password
        user.password = undefined
        // Resp
        res.status(200).send({
            sucess: true,
            message:'User get Successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Getting User Api',
            error
        })
    }
}

// ? UPDATE USER
export const updateUserController = async (req, res) => {
  try {
    // Buscar el usuario
    const user = await User.findById(req.body.id); // Corrección del uso de findById

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found'
      });
    }

    // Actualizar datos
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // Guardar los cambios
    await user.save();

    // Enviar respuesta exitosa
    res.status(200).send({
      success: true,
      message: 'User updated successfully'
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Updating user API Error'
    });
  }
};