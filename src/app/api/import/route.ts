import { CourseRecordList, FacultyList, ChangeRecord } from "@/types/dataTypes";
import {
  getFacultyById,
  addFaculty,
} from "@/models/faculty";
import {
  getCourseById,
  addCourse,
  updateCourse,
} from "@/models/courses";
import {
  getCourseFaculty,
  addFacultyAssignment,
  delFacultyAssignment,
} from "@/models/facultyAssignments";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Get Courses and Faculty
  const { courses, faculty } = await req.json() as { courses: CourseRecordList, faculty: FacultyList };
  const changes: ChangeRecord[] = []

  // Scan Faculty for new Faculty Members
  for (const facNo in faculty) {
    const fac = faculty[facNo];
    const facRecord = await getFacultyById(facNo);
    if (!facRecord) {
      if (await addFaculty(fac)) {
        changes.push({
          date: new Date(),
          changeType: 'New Faculty Record',
          faculty: fac,
          note: `New Faculty Record Added, ${fac.FacultyName} (${fac.FacultyNo})`,
        });
      }
    } else {
    }
  }

  // Scan Courses
  for (const id in courses) {
    const course = courses[id];
    const courseRecord = await getCourseById(id);
    // Check course Status
    if (course.Status === "Canceled") {
      changes.push({
        date: new Date(),
        changeType: "Canceled Course",
        course: course,
        note: `Course Canceled: ${id}: ${course.Subject} ${course.Catalog} ${course.Title}`,
      });
    }
    if (courseRecord) {
      let matched = true;
      // Change For Course Record Updates
      if (course.Status != courseRecord.Status) {
        matched = false;
        changes.push({
          date: new Date(),
          changeType: "Canceled Course",
          course: course,
          note: `Course ${id} changed status from ${courseRecord.Status} to ${course.Status}`,
        });
      }
      if (course.Enrolled != courseRecord.Enrolled) {
        matched = false;
      }
      if (!matched) {
        await updateCourse(course);
      }
    } else {
      if (await addCourse(course)) {
        changes.push({
          date: new Date(),
          changeType: 'New Course',
          course: course,
          note: `New Course Record created for ${id}: ${course.Subject} ${course.Catalog} ${course.Title}`,
        });
      }
    }
    // Handle Faculty Assignments
    const courseFaculty = await getCourseFaculty(course.SisId);
    for (const fac of course.FacultyAssigned) {
      if (courseFaculty && courseFaculty.length > 0) {
        // Check for Faculty on Query List in Course Records
        const matched = courseFaculty.filter(f => f.FacultyNo === fac.FacultyNo).length > 0;
        if (!matched) {
          changes.push({
            date: new Date(),
            course: course,
            faculty: fac,
            changeType: "Faculty Change",
            note: `Assigned Faculty ${fac.FacultyName} (${fac.FacultyNo}) to Course ${course.SisId}`,
          });
          await addFacultyAssignment(fac.FacultyNo, course.SisId);
        }
        // Check for Faculty in Course Record is in Query List
        for (const cfac of courseFaculty) {
          const found = course.FacultyAssigned.filter(f => f.FacultyNo === cfac.FacultyNo).length > 0;
          if (!found) {
            changes.push({
              date: new Date(),
              course: course,
              faculty: fac,
              changeType: "Faculty Change",
              note: `Removed Assigned Faculty ${fac.FacultyName} (${fac.FacultyNo}) from Course ${course.SisId}`,
            });
            await delFacultyAssignment(cfac.FacultyNo, cfac.SisId);
          }
        }
      } else {
        // No Current Faculty Assignment Records
        changes.push({
          date: new Date(),
          course: course,
          faculty: fac,
          changeType: "Faculty Change",
          note: `Assigned Faculty ${fac.FacultyName} (${fac.FacultyNo}) to Course ${course.SisId}`,
        });
        await addFacultyAssignment(fac.FacultyNo, course.SisId);
      }
    }
  }

  return NextResponse.json({
    date: new Date(),
    status: "Update Completed",
    body: changes,
  });
};