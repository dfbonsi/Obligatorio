import { categoryRepository } from "../repositories/category.repository.js";


export const getAllCategories = async () => {

    let categorias = await categoryRepository.getAll();
    return categorias;
}

export const createCategory = async (categoryName) => {

    const categoriaExiste = await categoryRepository.findByName(categoryName);
    if (categoriaExiste) {
        const error = new Error("La categoria existe");
        error.status = 400;
        throw error;
    }
    return await categoryRepository.create(categoryName);
}

export const updateCategory = async (id, data) => {
    const category = await categoryRepository.patchById(id, data);
    return category;
};

export const deleteCategory = async (id) => {
    const category = await categoryRepository.deleteById(id);
    return category;
};