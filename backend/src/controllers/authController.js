import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Check if user already exists
        const userExists = await prisma.user.findUnique({
            where: {email: email},
        });

        if (userExists) {
            return res
            .status(400)
            .json({error: "User already exists with this email"});
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create User
        const user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                password_hash: password_hash,
            },
        });

        // Generate JWT Token
        const token = generateToken(user.id, res);

        res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email
                }
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
    

};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user email exists in the table
        const user = await prisma.user.findUnique({
            where: {email: email},
        });

        if (!user) {
            return res
            .status(401)
            .json({error: "Invalid email or password"});
        }

        // Verify Password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res
            .status(401)
            .json({error: "Invalid email or password"});
        }

        // Generate JWT Token
        const token = generateToken(user.id, res);

        res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    email: email
                }
            },
            token,
        });



    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


export { register, login };