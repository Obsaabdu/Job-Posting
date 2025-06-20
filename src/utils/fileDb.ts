import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(__dirname, '..', 'data');

export async function readCollection<T>(name: 'users' | 'jobs' | 'applications'): Promise<Record<string, T>> {
  const file = path.join(dataDir, `${name}.json`);
  const text = await fs.readFile(file, 'utf-8');
  return JSON.parse(text || '{}');
}

export async function writeCollection<T>(name: 'users' | 'jobs' | 'applications', data: Record<string, T>): Promise<void> {
  const file = path.join(dataDir, `${name}.json`);
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
}
