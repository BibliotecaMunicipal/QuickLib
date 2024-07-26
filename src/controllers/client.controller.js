import { User, Client } from "../models/models.js";
import { sendEmail } from "../config/mailer.js";
import { getToken, getTokenData } from "../config/jwt.config.js";

export const registerClient = async (req, res) => {
    console.log(req.body);
    const { username, email, firstName, lastName, address, phoneNumber, status, age, verify } = req.body;
    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(404).send("User not found");
        }

        const newClient = new Client({
            username,
            email,
            firstName,
            lastName,
            address,
            phoneNumber,
            status,
            age,
            verify
        });

        const saveClient = await newClient.save();
		const token = getToken({ username: username, email: email });
		sendEmail(saveClient, token);
		res.send(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { code } = req.params;
        const existingClient = await Client.findOne({ username: code });

        if (!existingClient || existingClient.status === "false") {
            return res.status(404).send("Client not found");
        }

        existingClient.status = false;
        const updateClient = await existingClient.save();
        res.send(updateClient);
    } catch (error) {
        res.status(500).send("Client cannot be deleted");
    }
};

export const deleteClientF = async (req, res) => {
    try {
        const { code } = req.params;
        const existingClient = await Client.findOne({ username: code });
        if (!existingClient || existingClient.status === "true") {
            return res.status(404).send("Client not found");
        }
        const deletedUser = await existingClient.deleteOne();
        res.send(deletedUser);
    } catch (error) {
        res.status(500).send("Book cannot be deleted");
    }
};

export const recoverClient = async (req, res) => {
    try {
        const { code } = req.params;
        const existingClient = await Client.findOne({ username: code });
        if (!existingClient) {
            return res.status(404).send("Client not found");
        }
        existingClient.status = true;
        const updatedClient = await existingClient.save();
        res.send(updatedClient);
    } catch (error) {
        res.status(500).send("Client cannot be recovered");
    }
};

export const updateClient = async (req, res) => {
    const { code } = req.params;
    const { address, phoneNumber, firstName, lastName } = req.body;
    try {
        const existingClient = await Client.findOne({ username: code });
        if (!existingClient) {
            return res.status(404).send("Client not found");
        }
        existingClient.address = address;
        existingClient.phoneNumber = phoneNumber;
        existingClient.firstName = firstName;
        existingClient.lastName = lastName;
        const updatedClient = await existingClient.save();
        res.send(updatedClient);
    } catch (error) {
        console.error(error);
        res.status(500).send("Client cannot be updated");
    }
};

export const verifyAccount = async (req, res) => {
    const { token } = req.params;
    try {
        // Verfica si no hay un token
        if (!token) {
            return res.status(401).json({ message: 'No Token, Authorization Denied' });
        }

        // Verficar Data
        const data = getTokenData(token) || null;
        if (data === null) {
            res.send("Error Getting Data");
        }
        const { username } = data.data;

        // Checar el usuario
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send("User Not Found");
        }

        const existingClient = await Client.findOne({ username });
        existingClient.verify = true;

        const updateClient = await existingClient.save();
        res.redirect('http://localhost:5173/#/verified');

    } catch (error) {
        res.status(401).json({ message: 'Token Is Not Valid' });
    }
};

export const getClient = async (req, res) => {
    const { code } = req.params;
    try {
        const existingClient = await Client.findOne({ username: code });
        if (!existingClient || existingClient.status === false) {
            return res.status(404).send("Client not found");
        }
        res.send(existingClient);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting Clients info");
    }
};

export const getUsername = async (req, res) => {
    const { code } = req.params;
    try {
        const existingClient = await Client.findOne({ username: code });
        if (!existingClient) {
            return res.status(404).send("User not found");
        }
        const username = existingClient.username;
        return res.json({ message: "Acceso Permitido", username });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllClient = async (req, res) => {
    try {
        const clients = await Client.find();
        console.log(clients);
        res.send(clients);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener Client");
    }
};
