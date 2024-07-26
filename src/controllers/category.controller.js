import {Categorys} from "../models/models.js";

export const registerCategory = async (req, res) => {
console.log(req.body);
const { Category, nameCategory } = req.body;
try {
    const newCategory = new Categorys({
        Category,
        nameCategory,
    });
    const saveCategory = await newCategory.save();
    res.send(saveCategory);
} catch (error) {
    res.status(500).json({error: error.message});
}
}

export const getAllCategory = async (req, res) => {
    try {
        const category = await Categorys.find();
        console.log(category);
        res.send(category);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener las Categorias")
    }
}