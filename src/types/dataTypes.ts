export interface Course {
  SisId:        string;
  Term:         string;
  ClassNo:      string;
  Semester:     string;
  Subject:      string;
  Catalog:      string;
  Title:        string;
  Campus:       string;
  Location:     string;
  Mode:         string;
  Status:       string;
  Enrolled:     number;
  EnrollCap:    number;
  CanvasCode?:  number;
  CanvasName?:  string;
  CanvasState?: string;
  StartDate:    Date | string;
  EndDate:      Date | string;
};

export interface CourseRecord extends Course {
  FacultyAssigned: Faculty[];
};

export interface Faculty {
  FacultyNo:      string;
  FacultyName:    string;
  CanvasName?:    string;
  CanvasCode?:    number;
  Email?:         string;
};

export interface FacultyAssignment {
  SisId:      string;
  FacultyNo:  string;
  CreatedOn:  Date;
};

export interface CourseRecordList {
  [key: string]:  CourseRecord;
};

export interface FacultyList {
  [key: string]:  Faculty;
};

export interface ChangeRecord {
  date:       Date;
  course?:     Course;
  faculty?:   Faculty;
  changeType: string;
  note:       string;
};
