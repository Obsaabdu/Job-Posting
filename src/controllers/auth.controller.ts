import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { readCollection, writeCollection } from '../utils/fileDb';

export const signupController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const users = await readCollection('users');

    if (Object.values(users).some(u => (u as { email: string }).email === email)) {
      res.status(400).json({ success: false, message: 'Email already in use', object: null, errors: ['Duplicate email'] });
      return;
    }

    const id = uuidv4();
    const hashed = await bcrypt.hash(password, 10);

    users[id] = { id, name, email, password: hashed, role };
    await writeCollection('users', users);

      res.status(201).json({
      success: true,
      message: 'User registered',
      object: { id, name, email, role },
      errors: null
    });
    return;
  } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', object: null, errors: [String(err)] });
      return;
  }
};
