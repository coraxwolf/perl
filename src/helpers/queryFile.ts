import dayjs from 'dayjs';
import { parse, ParseResult } from 'papaparse';
import { QueryRow } from '@/types/queryTypes';
import {
  Course,
  CourseRecord,
  CourseRecordList,
  Faculty,
  FacultyList,
  FacultyAssignment,
} from '@/types/dataTypes';


export const readFile = (file: File) => {
  return new Promise((resolve) => {
    parse(
      file,
      {
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<QueryRow>, file) => {
          const courses: CourseRecordList = {};
          const faculty: FacultyList = {};
          for (const row of results.data) {
            // Check if Course Record already captured
            const id = `${row.Term}-${row['Class Nbr']}-${row.Subject}-${row.Catalog}`;
            if (courses[id]) {
              // Course Already Caputured -- check for faculty
              if (row.ID.toString().length > 0 && row.Name.length > 0) {
                const facNo = row.ID.toString().padStart(9, '0');
                if (faculty[facNo]) {
                  // faculty already captured
                  if (courses[id].FacultyAssigned.filter((f) => f.FacultyNo === facNo).length === 0) {
                    courses[id].FacultyAssigned.push(faculty[facNo]);
                  }
                } else {
                  faculty[facNo] = {
                    FacultyName: row.Name,
                    FacultyNo: facNo,
                  };
                  if (courses[id].FacultyAssigned.filter((f) => f.FacultyNo === facNo).length === 0) {
                    courses[id].FacultyAssigned.push(faculty[facNo]);
                  }
                }
              } else {
              }
            } else {
              courses[id] = {
                SisId: id,
                Term: row.Term.toString(),
                ClassNo: row['Class Nbr'].toString(),
                Semester: row.Session,
                Subject: row.Subject,
                Catalog: row.Catalog.toString().padStart(4, '0'),
                Title: row.Descr,
                Campus: row.Campus,
                Location: row.Location.toString(),
                Mode: row.Mode,
                Status: row['Class Stat'] === 'A' ? 'Active' : row['Class Stat'] === 'X' ? 'Canceled' : row['Class Stat'] === 'S' ? 'Stopped' : 'Unknown',
                EnrollCap: row.Cap,
                Enrolled: row['Tot Enrl'],
                StartDate: dayjs(row['Start Date']).toDate(),
                EndDate: dayjs(row['End Date']).toDate(),
                FacultyAssigned: [],
              };
              if (row.ID.toString().length > 0 && row.Name.length > 0) {
                const facNo = row.ID.toString().padStart(9, '0');
                if (faculty[facNo]) {
                  // faculty already captured
                  if (!courses[id].FacultyAssigned.filter((f) => f.FacultyNo === facNo)) {
                    courses[id].FacultyAssigned.push(faculty[facNo]);
                  }
                } else {
                  faculty[facNo] = {
                    FacultyName: row.Name,
                    FacultyNo: facNo,
                  };
                  if (!courses[id].FacultyAssigned.filter((f) => f.FacultyNo === facNo)) {
                    courses[id].FacultyAssigned.push(faculty[facNo]);
                  }
                }
              } else {
              }
            }
          }
          return resolve([courses, faculty]);
        }
      });
  });
};
