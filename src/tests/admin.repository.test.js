import AdminRepository from '../repository/admin.repository.js';
import Admin from '../models/admin.model.js';

jest.mock('../models/admin.model.js'); // Mock del modelo Admin

describe('AdminRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar mocks antes de cada test
  });

  describe('findByUsuario', () => {
    it('debería encontrar un administrador por su usuario', async () => {
      const usuario = 'admin123';
      const mockAdmin = { id: 1, usuario, nombre: 'Admin' };
      Admin.findOne.mockResolvedValue(mockAdmin); // Mock de la función findOne

      const result = await AdminRepository.findByUsuario(usuario);

      expect(Admin.findOne).toHaveBeenCalledWith({ where: { usuario } });
      expect(result).toEqual(mockAdmin);
    });

    it('debería retornar null si no se encuentra el administrador', async () => {
      const usuario = 'admin123';
      Admin.findOne.mockResolvedValue(null); // Simular que no se encuentra el administrador

      const result = await AdminRepository.findByUsuario(usuario);

      expect(result).toBeNull();
    });

    it('debería lanzar un error si ocurre un problema', async () => {
      const usuario = 'admin123';
      Admin.findOne.mockRejectedValue(new Error('Error en la base de datos')); // Simular error

      await expect(AdminRepository.findByUsuario(usuario)).rejects.toThrow('Error al buscar el administrador por usuario: Error en la base de datos');
    });
  });

  describe('create', () => {
    it('debería crear un nuevo administrador', async () => {
      const adminData = { usuario: 'admin123', nombre: 'Admin' };
      const mockAdmin = { id: 1, ...adminData };
      Admin.create.mockResolvedValue(mockAdmin); // Mock de la función create

      const result = await AdminRepository.create(adminData);

      expect(Admin.create).toHaveBeenCalledWith(adminData);
      expect(result).toEqual(mockAdmin);
    });

    it('debería lanzar un error si ocurre un problema', async () => {
      const adminData = { usuario: 'admin123', nombre: 'Admin' };
      Admin.create.mockRejectedValue(new Error('Error en la creación del administrador')); // Simular error

      await expect(AdminRepository.create(adminData)).rejects.toThrow('Error al crear el administrador: Error en la creación del administrador');
    });
  });

  describe('update', () => {
    it('debería actualizar un administrador correctamente', async () => {
      const adminId = 1;
      const adminData = { nombre: 'Nuevo Nombre' };
      const mockAdmin = { id: adminId, ...adminData };
      Admin.update.mockResolvedValue([1]); // El primer valor del array es el número de filas afectadas
      Admin.findByPk.mockResolvedValue(mockAdmin); // Simular que el administrador actualizado se obtiene correctamente

      const result = await AdminRepository.update(adminId, adminData);

      expect(Admin.update).toHaveBeenCalledWith(adminData, { where: { id: adminId } });
      expect(Admin.findByPk).toHaveBeenCalledWith(adminId);
      expect(result).toEqual(mockAdmin);
    });

    it('debería lanzar un error si el administrador no se encuentra', async () => {
      const adminId = 1;
      const adminData = { nombre: 'Nuevo Nombre' };
      Admin.update.mockResolvedValue([0]); // No se actualizó nada, porque no se encontró el administrador

      await expect(AdminRepository.update(adminId, adminData)).rejects.toThrow('Administrador no encontrado');
    });

    it('debería lanzar un error si ocurre un problema', async () => {
      const adminId = 1;
      const adminData = { nombre: 'Nuevo Nombre' };
      Admin.update.mockRejectedValue(new Error('Error en la actualización del administrador')); // Simular error

      await expect(AdminRepository.update(adminId, adminData)).rejects.toThrow('Error al actualizar el administrador: Error en la actualización del administrador');
    });
  });

  describe('delete', () => {
    it('debería eliminar un administrador correctamente', async () => {
      const adminId = 1;
      Admin.destroy.mockResolvedValue(1); // Simular que el administrador fue eliminado correctamente

      const result = await AdminRepository.delete(adminId);

      expect(Admin.destroy).toHaveBeenCalledWith({ where: { id: adminId } });
      expect(result).toBe(true);
    });

    it('debería lanzar un error si el administrador no se encuentra', async () => {
      const adminId = 1;
      Admin.destroy.mockResolvedValue(0); // No se eliminó nada, porque no se encontró el administrador

      await expect(AdminRepository.delete(adminId)).rejects.toThrow('Administrador no encontrado');
    });

    it('debería lanzar un error si ocurre un problema', async () => {
      const adminId = 1;
      Admin.destroy.mockRejectedValue(new Error('Error en la eliminación del administrador')); // Simular error

      await expect(AdminRepository.delete(adminId)).rejects.toThrow('Error al eliminar el administrador: Error en la eliminación del administrador');
    });
  });
});
