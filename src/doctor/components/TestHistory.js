import { Biotech } from '@mui/icons-material';
import React from 'react';

function TestHistory() {
  const history = {
    id: 18,
    uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
    status: 'IN_PROGRESS',
    createdAt: '2022-06-16T10:50:54.000Z',
    updatedAt: '2022-06-16T10:50:54.000Z',
    PatientId: 4,
    LabTests: [
      {
        id: 1,
        title: 'Malaria Test',
        description: 'Check for P',
        result: 'Positive',
        resultDescription: '',
        done: true,
        paid: false,
        createdAt: '2022-07-03T13:09:13.000Z',
        updatedAt: '2022-07-03T13:22:24.000Z',
        deletedAt: null,
        session: {
          id: 18,
          uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
          status: 'IN_PROGRESS',
          createdAt: '2022-06-16T10:50:54.000Z',
          updatedAt: '2022-06-16T10:50:54.000Z',
          PatientId: 4
        },
        patient: {
          id: 4,
          uuid: '739282b3-a9cc-4e5c-856b-b32f34cd7b2d',
          name: 'Jane Mary',
          dob: '1990-08-25T00:00:00.000Z',
          phoneNumber: '08012345678',
          email: 'janemary@mail.com',
          createdAt: '2022-06-15T08:21:31.000Z',
          updatedAt: '2022-06-15T08:21:31.000Z',
          deletedAt: null
        },
        doctor: {
          uuid: '5d8e14a1-4527-489d-98ef-4e8c94cf34a3',
          username: 'admin',
          role: 'ADMIN',
          fullName: 'Super Admin',
          status: true,
          createdAt: '2022-06-14T17:08:02.000Z',
          updatedAt: '2022-06-15T06:08:36.000Z',
          deletedAt: null
        }
      },
      {
        id: 3,
        title: 'HBV test',
        description: '',
        result: null,
        resultDescription: null,
        done: false,
        paid: false,
        createdAt: '2022-07-03T13:25:12.000Z',
        updatedAt: '2022-07-03T13:25:12.000Z',
        deletedAt: null,
        session: {
          id: 18,
          uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
          status: 'IN_PROGRESS',
          createdAt: '2022-06-16T10:50:54.000Z',
          updatedAt: '2022-06-16T10:50:54.000Z',
          PatientId: 4
        },
        patient: {
          id: 4,
          uuid: '739282b3-a9cc-4e5c-856b-b32f34cd7b2d',
          name: 'Jane Mary',
          dob: '1990-08-25T00:00:00.000Z',
          phoneNumber: '08012345678',
          email: 'janemary@mail.com',
          createdAt: '2022-06-15T08:21:31.000Z',
          updatedAt: '2022-06-15T08:21:31.000Z',
          deletedAt: null
        },
        doctor: {
          uuid: '5d8e14a1-4527-489d-98ef-4e8c94cf34a3',
          username: 'admin',
          role: 'ADMIN',
          fullName: 'Super Admin',
          status: true,
          createdAt: '2022-06-14T17:08:02.000Z',
          updatedAt: '2022-06-15T06:08:36.000Z',
          deletedAt: null
        }
      },
      {
        id: 4,
        title: 'XYZ test',
        description: '',
        result: null,
        resultDescription: null,
        done: false,
        paid: false,
        createdAt: '2022-07-03T13:25:23.000Z',
        updatedAt: '2022-07-03T13:25:23.000Z',
        deletedAt: null,
        session: {
          id: 18,
          uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
          status: 'IN_PROGRESS',
          createdAt: '2022-06-16T10:50:54.000Z',
          updatedAt: '2022-06-16T10:50:54.000Z',
          PatientId: 4
        },
        patient: {
          id: 4,
          uuid: '739282b3-a9cc-4e5c-856b-b32f34cd7b2d',
          name: 'Jane Mary',
          dob: '1990-08-25T00:00:00.000Z',
          phoneNumber: '08012345678',
          email: 'janemary@mail.com',
          createdAt: '2022-06-15T08:21:31.000Z',
          updatedAt: '2022-06-15T08:21:31.000Z',
          deletedAt: null
        },
        doctor: {
          uuid: '5d8e14a1-4527-489d-98ef-4e8c94cf34a3',
          username: 'admin',
          role: 'ADMIN',
          fullName: 'Super Admin',
          status: true,
          createdAt: '2022-06-14T17:08:02.000Z',
          updatedAt: '2022-06-15T06:08:36.000Z',
          deletedAt: null
        }
      }
    ]
  };
  const date = new Date(history.createdAt).toDateString();

  return (
    <div className="p-10">
      <div className="flex flex-row items-center">
        <Biotech sx={{ mr: 1 }} />
        <p className="text-xl font-bold text-wider">Lab Tests</p>
      </div>
      <p> Date: {date}</p>
      <p>Status: {history.status}</p>
    </div>
  );
}

export default TestHistory;
