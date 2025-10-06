import docenteRepo from '../repositories/docente.repository.js';

jest.mock('../repositories/docente.repository.js', () => ({
  crearDocente: jest.fn(),
  obtenerDocentes: jest.fn(),
  eliminarDocente: jest.fn(),
}));

describe('Repositorio de Docente', () => {

  it('crearDocente debe crear un docente correctamente', async () => {
    const mockDocente = { primerNombre: "Juan", primerApellido: "Lerma", documento: "12345", codigo: "1010" };
    docenteRepo.crearDocente.mockResolvedValue({ success: true, data: mockDocente });

    const result = await docenteRepo.crearDocente(mockDocente);

    expect(result).toEqual({ success: true, data: mockDocente });
    expect(docenteRepo.crearDocente).toHaveBeenCalledWith(mockDocente);
  });

  it('obtenerDocentes debe retornar una lista de docentes', async () => {
    const mockLista = [{ primerNombre: "Juan", primerApellido: "Lerma" }];
    docenteRepo.obtenerDocentes.mockResolvedValue({ success: true, data: mockLista });

    const result = await docenteRepo.obtenerDocentes();

    expect(result).toEqual({ success: true, data: mockLista });
    expect(docenteRepo.obtenerDocentes).toHaveBeenCalled();
  });

  it('eliminarDocente debe eliminar un docente por ID', async () => {
    docenteRepo.eliminarDocente.mockResolvedValue({ success: true, message: "Docente eliminado correctamente" });

    const result = await docenteRepo.eliminarDocente("12345");

    expect(result).toEqual({ success: true, message: "Docente eliminado correctamente" });
    expect(docenteRepo.eliminarDocente).toHaveBeenCalledWith("12345");
  });

});
