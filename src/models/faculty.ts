import {Faculty} from '@/types/dataTypes';
import db from '@/lib/db';

export const getFacultyById = async (id: string) => {
  const sql = 'SELECT * FROM faculty WHERE FacultyNo = ?';
  try {
    const results = await db.query<Faculty[] | null>(sql, [id]);
    if (results) {
      return results[0];
    } else {
      return null;
    }
  } catch (e) {
    console.debug(e);
    return null;
  }
};

export const addFaculty = async (faculty: Faculty) => {
  const sql = 'INSERT INTO faculty (FacultyName, FacultyNo, CanvasName, CanvasCode, Email) VALUES (?, ?, ?, ?, ?)';
  try {
    const result = db.query(sql, [
      faculty.FacultyName,
      faculty.FacultyNo,
      faculty.CanvasName || null,
      faculty.CanvasCode || null,
      faculty.Email || null,
    ]);
    return result;
  } catch (e) {
    console.debug(e);
    return null;
  }
}

export const updateFaculty = async (faculty: Faculty) => {
  const sql = 'UPDATE faculty SET Facultyname = ?, CanvasName = ?, CanvasCode = ?, Email = ? WHERE FacultyNo = ?';
  try {
    const result = db.query(sql, [
      faculty.FacultyName,
      faculty.FacultyNo,
      faculty.CanvasName || null,
      faculty.CanvasCode || null,
      faculty.Email || null,
    ]);
    return result;
  } catch (e) {
    console.debug(e);
    return null;
  }
}