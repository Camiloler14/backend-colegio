import Admin from '../models/admin.model.js';

const AdminRepository = {
  /**
   * Busca un administrador por su usuario.
   * @param {string} usuario - El nombre de usuario del administrador.
   * @returns {Object} El objeto administrador si se encuentra, o null si no se encuentra.
   */
  findByUsuario: async (usuario) => {
    try {
      return await Admin.findOne({ where: { usuario } });
    } catch (error) {
      throw new Error('Error al buscar el administrador por usuario: ' + error.message);
    }
  },

  /**
   * Crea un nuevo administrador en la base de datos.
   * @param {Object} adminData - Los datos del administrador a crear.
   * @returns {Object} El objeto administrador recién creado.
   */
  create: async (adminData) => {
    try {
      return await Admin.create(adminData);
    } catch (error) {
      throw new Error('Error al crear el administrador: ' + error.message);
    }
  },

  /**
   * Actualiza los datos de un administrador por su ID.
   * @param {number} adminId - El ID del administrador a actualizar.
   * @param {Object} adminData - Los nuevos datos del administrador.
   * @returns {Object} El objeto administrador actualizado.
   */
  update: async (adminId, adminData) => {
    try {
      const [updated] = await Admin.update(adminData, { where: { id: adminId } });
      if (!updated) {
        throw new Error('Administrador no encontrado');
      }
      return Admin.findByPk(adminId); // Devuelve el administrador actualizado.
    } catch (error) {
      throw new Error('Error al actualizar el administrador: ' + error.message);
    }
  },

  /**
   * Elimina un administrador por su ID.
   * @param {number} adminId - El ID del administrador a eliminar.
   * @returns {boolean} True si se eliminó correctamente, false si no se encontró.
   */
  delete: async (adminId) => {
    try {
      const deleted = await Admin.destroy({ where: { id: adminId } });
      if (!deleted) {
        throw new Error('Administrador no encontrado');
      }
      return true; // Admin eliminado
    } catch (error) {
      throw new Error('Error al eliminar el administrador: ' + error.message);
    }
  },
};

export default AdminRepository;
