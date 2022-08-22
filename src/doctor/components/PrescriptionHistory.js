/* eslint-disable react/prop-types */
import { Divider, Grid } from '@material-ui/core';
import { Circle, Healing } from '@mui/icons-material';
import React from 'react';

function PrescriptionHistory() {
  const history = {
    id: 18,
    uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
    status: 'IN_PROGRESS',
    createdAt: '2022-06-16T10:50:54.000Z',
    updatedAt: '2022-06-16T10:50:54.000Z',
    PatientId: 4,
    Prescriptions: [
      {
        id: 1,
        quantity: 6,
        note: 'To be taken 2-2-2 per day',
        days: 3,
        createdAt: '2022-07-03T10:30:56.000Z',
        updatedAt: '2022-07-03T10:30:56.000Z',
        session: {
          id: 18,
          uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
          status: 'IN_PROGRESS',
          createdAt: '2022-06-16T10:50:54.000Z',
          updatedAt: '2022-06-16T10:50:54.000Z',
          PatientId: 4
        },
        drug: {
          id: 1,
          name: 'Panadol',
          description: 'A drug to combat headache',
          price: 10,
          quantity: 3000,
          type: 'DRUG',
          createdAt: '2022-07-03T08:17:19.000Z',
          updatedAt: '2022-07-03T08:38:25.000Z',
          deletedAt: null
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
        quantity: 6,
        note: 'To be taken 2-2-2 per day',
        days: 3,
        createdAt: '2022-07-03T10:33:51.000Z',
        updatedAt: '2022-07-03T10:33:51.000Z',
        session: {
          id: 18,
          uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
          status: 'IN_PROGRESS',
          createdAt: '2022-06-16T10:50:54.000Z',
          updatedAt: '2022-06-16T10:50:54.000Z',
          PatientId: 4
        },
        drug: {
          id: 1,
          name: 'Panadol',
          description: 'A drug to combat headache',
          price: 10,
          quantity: 3000,
          type: 'DRUG',
          createdAt: '2022-07-03T08:17:19.000Z',
          updatedAt: '2022-07-03T08:38:25.000Z',
          deletedAt: null
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
        quantity: 6,
        note: 'To be taken 2-2-2 per day',
        days: 3,
        createdAt: '2022-07-03T10:35:21.000Z',
        updatedAt: '2022-07-03T10:35:21.000Z',
        session: {
          id: 18,
          uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
          status: 'IN_PROGRESS',
          createdAt: '2022-06-16T10:50:54.000Z',
          updatedAt: '2022-06-16T10:50:54.000Z',
          PatientId: 4
        },
        drug: {
          id: 1,
          name: 'Panadol',
          description: 'A drug to combat headache',
          price: 10,
          quantity: 3000,
          type: 'DRUG',
          createdAt: '2022-07-03T08:17:19.000Z',
          updatedAt: '2022-07-03T08:38:25.000Z',
          deletedAt: null
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
        id: 5,
        quantity: 6,
        note: 'To be taken 2-2-2 per day',
        days: 3,
        createdAt: '2022-07-03T10:36:23.000Z',
        updatedAt: '2022-07-03T10:36:23.000Z',
        session: {
          id: 18,
          uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
          status: 'IN_PROGRESS',
          createdAt: '2022-06-16T10:50:54.000Z',
          updatedAt: '2022-06-16T10:50:54.000Z',
          PatientId: 4
        },
        drug: {
          id: 1,
          name: 'Panadol',
          description: 'A drug to combat headache',
          price: 10,
          quantity: 3000,
          type: 'DRUG',
          createdAt: '2022-07-03T08:17:19.000Z',
          updatedAt: '2022-07-03T08:38:25.000Z',
          deletedAt: null
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
        id: 6,
        quantity: 6,
        note: 'To be taken 2-2-2 per day',
        days: 3,
        createdAt: '2022-07-03T10:37:27.000Z',
        updatedAt: '2022-07-03T10:37:27.000Z',
        session: {
          id: 18,
          uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
          status: 'IN_PROGRESS',
          createdAt: '2022-06-16T10:50:54.000Z',
          updatedAt: '2022-06-16T10:50:54.000Z',
          PatientId: 4
        },
        drug: {
          id: 1,
          name: 'Panadol',
          description: 'A drug to combat headache',
          price: 10,
          quantity: 3000,
          type: 'DRUG',
          createdAt: '2022-07-03T08:17:19.000Z',
          updatedAt: '2022-07-03T08:38:25.000Z',
          deletedAt: null
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
        id: 7,
        quantity: 6,
        note: 'To be taken 2-2-2 per day for 3 days',
        days: 3,
        createdAt: '2022-07-03T10:38:31.000Z',
        updatedAt: '2022-07-03T10:55:46.000Z',
        session: {
          id: 18,
          uuid: '3537b310-6069-4e0d-b4b4-bf41924897ac',
          status: 'IN_PROGRESS',
          createdAt: '2022-06-16T10:50:54.000Z',
          updatedAt: '2022-06-16T10:50:54.000Z',
          PatientId: 4
        },
        drug: {
          id: 1,
          name: 'Panadol',
          description: 'A drug to combat headache',
          price: 10,
          quantity: 3000,
          type: 'DRUG',
          createdAt: '2022-07-03T08:17:19.000Z',
          updatedAt: '2022-07-03T08:38:25.000Z',
          deletedAt: null
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
        <Healing sx={{ mr: 1 }} />
        <p className="text-xl font-bold text-wider">Prescription</p>
      </div>
      <p> Date: {date}</p>
      <p>Status: {history.status}</p>
      <div className="grid-header">
        <Grid container spacing={2} style={{ fontWeight: 'bold' }}>
          <Grid item xs={2}>
            Drug
          </Grid>
          <Grid item xs={2}>
            Quantity
          </Grid>
          <Grid item xs={2} style={{ color: '#808080' }}>
            Prescribed By
          </Grid>
          <Grid item xs={2}>
            Days
          </Grid>
          <Grid item xs={4}>
            Note
          </Grid>
        </Grid>
        <Divider variant="fullWidth" orientation="horizontal" />
      </div>
      <div className="grid-body">
        {!history.Prescriptions.length ? (
          <p className="text-lg pl-3 mb-3 text-red-500">No prescriptions for this session</p>
        ) : (
          history &&
          history.Prescriptions.map((prescription, index) => {
            const { quantity, note, days, drug, doctor } = prescription;
            return (
              <>
                <Grid key={index} container spacing={2} style={{ padding: 8 }}>
                  <Grid item xs={2}>
                    <div className="flex flex-row items-center">
                      <Circle sx={{ color: '#48bb78', fontSize: '12px', mr: 1 }} />
                      {drug.name}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    {quantity}
                  </Grid>
                  <Grid item xs={2} style={{ color: '#808080' }}>
                    {doctor.fullName}
                  </Grid>
                  <Grid item xs={2}>
                    {days}
                  </Grid>
                  <Grid item xs={4}>
                    {note}
                  </Grid>
                </Grid>
                {index !== history.Prescriptions.length - 1 ? (
                  <Divider variant="fullWidth" orientation="horizontal" />
                ) : null}
              </>
            );
          })
        )}
      </div>
      <div className=" mt-10 mb-10 w-full border-4 border-solid border-green-500"></div>
    </div>
  );
}

export default PrescriptionHistory;
