// app/api/resumes/_lib.ts
// Shared helpers for the resumes API routes. Prefixed with an underscore so
// Next.js doesn't treat this as a route file.
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const RESUME_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export function safeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
}

export function isValidResumeFile(file: File): boolean {
  return RESUME_MIME_TYPES.includes(file.type) || /\.(pdf|doc|docx)$/i.test(file.name);
}

export async function saveUploadedFile(file: File, subfolder: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const dir = path.join(process.cwd(), 'public', 'uploads', subfolder);
  await mkdir(dir, { recursive: true });

  const fileName = `${randomUUID()}-${safeFileName(file.name)}`;
  await writeFile(path.join(dir, fileName), buffer);

  // Served directly by Next.js's static file handling for /public
  return `/uploads/${subfolder}/${fileName}`;
}

// Best-effort cleanup when a file is replaced or its parent record is deleted.
// Silently ignores errors — a missing file or a non-local URL isn't fatal here.
export async function deleteUploadedFile(urlPath: string | null | undefined): Promise<void> {
  if (!urlPath || !urlPath.startsWith('/uploads/')) return;
  try {
    const filePath = path.join(process.cwd(), 'public', urlPath);
    await unlink(filePath);
  } catch {
    // ignore
  }
}

export function parseJsonArray(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}