import db from '@/lib/db';
import {
  Course,
  CourseRecord,
} from '@/types/dataTypes';
import dayjs from 'dayjs';

export const getCourseById = async (id: string) => {
  const sql = 'SELECT * FROM course WHERE SisId = ?';
  try {
    const results = await db.query<Course[] | null>(sql, [id]);
    if (results) {
      return results[0];
    } else {
      return null;
    }
  } catch (e) {
    if (e) {
      console.debug(e);
    }
    return null;
  }
};

export const addCourse = async (course: Course) => {
  const sql =  `INSERT INTO course 
    (SisId,
      Term,
      ClassNo,
      Semester,
      Subject,
      Catalog,
      Title,
      Campus,
      Location,
      Mode,
      Status,
      Enrolled,
      EnrollCap,
      CanvasCode,
      CanvasName,
      CanvasState,
      StartDate,
      EndDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    const result = await db.query(sql, [
      course.SisId,
      course.Term,
      course.ClassNo,
      course.Semester,
      course.Subject,
      course.Catalog,
      course.Title,
      course.Campus,
      course.Location,
      course.Mode,
      course.Status,
      course.Enrolled,
      course.EnrollCap,
      course.CanvasCode || null,
      course.CanvasName || null,
      course.CanvasState || null,
      dayjs(course.StartDate).format("YYYY-MM-DD"),
      dayjs(course.EndDate).format("YYYY-MM-DD"),
    ]);
    return result ? true : false;
  } catch (e) {
    console.error(e)
    return false;
  }
};

export const updateCourse = async (course: Course) => {
  const sql =  `UPDATE course  
      SET Semester = ?,
      Subject = ?,
      Catalog = ?,
      Title = ?,
      Campus = ?,
      Location = ?,
      Mode = ?,
      Status = ?,
      Enrolled = ?,
      EnrollCap = ?,
      CanvasCode = ?,
      CanvasName = ?,
      CanvasState = ?,
      StartDate = ?,
      EndDate = ?
      WHERE SisId = ?`;
  try {
    const result = await db.query(sql, [
      course.Semester,
      course.Subject,
      course.Catalog,
      course.Title,
      course.Campus,
      course.Location,
      course.Mode,
      course.Status,
      course.Enrolled,
      course.EnrollCap,
      course.CanvasCode || null,
      course.CanvasName || null,
      course.CanvasState || null,
      dayjs(course.StartDate).format("YYYY-MM-DD"),
      dayjs(course.EndDate).format("YYYY-MM-DD"),
      course.SisId,
    ]);
    return result ? true : false;
  } catch (e) {
    console.error(e)
    return false;
  }
};
