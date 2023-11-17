"use client"

import { readFile } from '@/helpers/queryFile';
import { 
  CourseRecordList,
  FacultyList,
  ChangeRecord,
 } from '@/types/dataTypes';

import {useState} from 'react';

export default function QueryPage() {
  const [status, setStatus] = useState<string>('READY');
  const [courses, setCourses] = useState<number>(0);
  const [faculty, setFaculty] = useState<number>(0);
  const [changes, setChanges] = useState<ChangeRecord[] | null>(null);
  
  const handleFile = async (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setStatus(`Reading File ${e.currentTarget.files[0].name}`);
      readFile(e.currentTarget.files[0]);
      const [courseRecords, facultyRecords] = await readFile(e.currentTarget.files[0]) as [CourseRecordList, FacultyList];
      setCourses(Object.keys(courseRecords).length);
      setFaculty(Object.keys(facultyRecords).length);
      setStatus('Query File Read');
      setStatus('Uploading Data....');
      const res = await fetch('/api/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({courses: courseRecords, faculty: facultyRecords}),
      });
      const data = await res.json();
      setStatus('Completed Importing Query Data');
      setChanges(data.body);
    }
  };

  return (
    <section>
      <h1 className="font-heading font-bold text-5xl text-center">
        Query Import
      </h1>
      <div className="flex space-x-4 mx-4 mb-4">
        <label htmlFor="queryFile">
          <span className="text-2xl font-italic mr-2 px-2">Load Query File: </span>
          <input type="file" name="queryFile" id="queryFile" onChange={handleFile} />
        </label>
      </div>
      <div className="flex space-x-8 bg-bluebonnet mb-2">
        <span className="w-full m-4 p-4 font-avenir font-bold text-2xl">
          {status}
        </span>
      </div>
      <div className="flex space-x-8 bg-white">
        <div className="w-1/2 h-2/4 bg-sunshine text-black m-2 p-4">
          <span className="text-3xl font-heading m-2 p-2">Courses</span>
          <span className="text-2xl font-bold p-2">{courses.toLocaleString()}</span>
        </div>
        <div className="w-1/2 h-2/4 bg-sunshine text-black m-2 p-4">
          <span className="text-3xl font-heading m-2 p-2">Faculty</span>
          <span className="text-2xl font-bold p-2">{faculty.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex flex-col w-full bg-memorialgreen my-4">
        {changes && (
          changes.map((c) => {
            return (
              <div key={c.changeType} className="flex space-x-4 bg-battleship m-2 p-2">
                <span className="font-heading text-2xl text-white">{c.changeType}</span>
                <span className="font-italic text-2xl text-white">{c.note}</span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};