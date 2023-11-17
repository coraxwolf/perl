import {Faculty, FacultyAssignment} from '@/types/dataTypes';
import db from '@/lib/db';

export const addFacultyAssignment = async (facultyNo: string, courseId: string) => {
  const sql = 'INSERT INTO facultyAssignments (SisId, FacultyNo) VALUES (?, ?)';
  try {
    const results = await db.query(sql, [courseId, facultyNo]);
    return results ? true : false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const delFacultyAssignment = async (facultyNo: string, courseId: string) => {
  const sql = 'DELETE FROM facultyAssignments WHERE SisId = ? AND facultyNo = ?';
  try {
    const results = await db.query(sql, [courseId, facultyNo]);
    return results ? true : false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getCourseFaculty = async (courseId: string) => {
  const sql = 'SELECT * FROM facultyAssignments WHERE SisId = ?';
  try {
    const results = await db.query<FacultyAssignment[] | null>(sql, [courseId]);
    if (results && results?.length > 0) {
      return results;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};