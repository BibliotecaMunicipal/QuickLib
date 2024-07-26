import { Opinions } from "../models/models.js";

export const registerOpinion = async (req, res) => {
    console.log(req.body);
    const { email, name, message } = req.body;
    try {
        const newOpinion = new Opinions({
            email,
            name,
            message,
        });
        const saveOpinion = await newOpinion.save();
        res.send(saveOpinion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllOpinios = async (req, res) => {
  try {
    const opinions = await Opinions.find();
    console.log(opinions);
    res.send(opinions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener Opinions");
  }
};

export const deleteOpinionF = async (req, res) => {
    try {
        const { code } = req.params;
        const existingOpinion = await Opinions.findOne({ idOpinion: code});
        const deletedOpinion = await existingOpinion.deleteOne();
        res.send(deletedOpinion);
    } catch (error) {
        res.status(500).send("Opinion cannot be deleted");
    }
};

export const updateOpinion = async (req, res) => {
  const { idOpinion } = req.params;
  const { showOnMainPage } = req.body;

  try {
    const updatedOpinion = await Opinions.findOneAndUpdate(
      { idOpinion },
      { showOnMainPage: true },
      { new: true }
    );

    if (!updatedOpinion) {
      return res.status(404).json({ message: 'Opinion not found' });
    }

    res.json(updatedOpinion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};