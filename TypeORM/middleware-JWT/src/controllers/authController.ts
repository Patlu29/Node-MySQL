import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { userName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create({ userName, email, password: hashedPassword });

    await userRepository.save(user);

    res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { password } = req.body;
    const user = (req as any).user;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401).json({ message: 'Invalid password' });
        return
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
};
