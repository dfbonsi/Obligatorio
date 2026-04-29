import * as categoryServices from "../services/category.services.js"


export const getAllCategoriesController = async (req, res, next) => {
    try {
        const categorias = await categoryServices.getAllCategories();
        //console.log('categorias', categorias)
        res.status(200).json({ categorias })
    } catch (error) {

        next(error)
    }
}

export const createCategoryController = async (req, res, next) => {
    try {
        const { categoryName } = req.body;
        const category = await categoryServices.createCategory(categoryName);
        res.status(201).json({ category })
    } catch (error) {
        next(error)
    }
}

export const updateCategoryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const  data= req.body;
        const category = await categoryServices.updateCategory(id, data);
        if (!category) {
            return next(createError('Categoria no encontrada', 404));
        }
        res.json({
            message: 'Categoria actualizada',
            category
        });
    } catch (error) {
        next(error);
    }
}

export const deleteCategoryController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await categoryServices.deleteCategory(id);
        if (!category) {
            return next(createError('Categoria no encontrada', 404));
        }
        res.json({
            message: 'Categoria borrada exitosamente'
        });
    } catch (error) {
        next(error);
    }
};