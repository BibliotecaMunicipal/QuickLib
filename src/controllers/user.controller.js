import { User } from "../models/models.js";
import bcryptjs from "bcryptjs";
import { getToken } from "../config/jwt.config.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = getToken({ username, role: user.role }); // Incluye el rol en el token
        console.log("Inicio de sesión correctamente");
        res.status(200).json({ token, username, role: user.role }); // Devuelve el token y el rol
        console.log(`Role: ${user.role}`)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const registerUser = async (req, res) => {
    console.log(req.body);
    const { username, password, role } = req.body;
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        const newUser = new User({
            username,
            password: passwordHash,
            role,
        });

        const saveUser = await newUser.save();
        res.send(saveUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { code } = req.params;
        const existingUser = await User.findOne({ username: code });
        if (!existingUser) {
            return res.status(404).send("User not found");
        }

        existingUser.status = false;
        const updateUser = await existingUser.save();
        res.send(updateUser);
    } catch (error) {
        res.status(500).send("User cannot be deleted");
    }
}

export const deleteUserF = async (req, res) => {
    try {
        const { code } = req.params;
        const existingUser = await User.findOne({ username: code });
        if (!existingUser || existingUser.status === "true") {
            return res.status(404).send("User not found");
        }
        const deletedUser = await existingUser.deleteOne();
        res.send(deletedUser);
    } catch (error) {
        res.status(500).send("User cannot be deleted");
    }
}

export const roleUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });

        if(!user) {
            return res.status(404).json( { error: 'User not found' });
        }
    
        res.status(200).json({ role: user.role })
    } catch (error) {
        console.error("Error Fetchin user role", error);
        res.status(500).json({ error: "Internal Server error"});
    }

}