/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Person } from '@mui/icons-material';
import Nav from '../../common-components/Nav';
import PatientSearchBar from '../../common-components/PatientSearchBar';
import { FaUserMd } from 'react-icons/fa';
import { createStyles } from '@mui/styles';

function DoctorHome() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const allWorkers = JSON.parse(localStorage.getItem('allWorkers'));
  const [isDoctorAvailable, setIsDoctorAvailable] = useState(
    JSON.parse(localStorage.getItem('isDoctorAvailable')) ?? false
  );
  const [availableDoctors, setAvailableDoctors] = useState(
    JSON.parse(localStorage.getItem('availableDoctors')) ?? []
  );
  // TODO this list should come from the receptionist so set receptionist send to in localstorage and then get it from here for specific doctor
  const patientsList = JSON.parse(localStorage.getItem('patients')) ?? [];

  const findDoctor = (role, id) => {
    return allWorkers.filter((worker) => worker.role === role && worker.id === id);
  };
  const thisDoctor = findDoctor('doctor', 4);
  console.log(thisDoctor);

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setIsDoctorAvailable(true);
      if (availableDoctors.length > 0) {
        setAvailableDoctors(availableDoctors.push(thisDoctor[0].name));
      } else if (availableDoctors.length === 0) {
        setAvailableDoctors([thisDoctor[0].name]);
      }
    }
    if (!event.target.checked) {
      setIsDoctorAvailable(false);
      setAvailableDoctors(availableDoctors.filter((doc) => doc !== thisDoctor[0].name));
    }
  };
  useEffect(() => {
    localStorage.setItem('availableDoctors', JSON.stringify(availableDoctors));
  }, [availableDoctors]);
  useEffect(() => {
    localStorage.setItem('isDoctorAvailable', JSON.stringify(isDoctorAvailable));
  }, [isDoctorAvailable]);
  return (
    <div>
      <Nav />
      <div className="p-8">
        <section className="flex justify-between">
          <div>
            <div className="flex space-x-2">
              <FaUserMd className="mt-5" />
              <h2 className="text-xl">Dr. {thisDoctor[0].name} </h2>
            </div>
            <div className="flex space-x-2 mt-[-2px]">
              <Checkbox size="small" checked={isDoctorAvailable} onChange={handleCheckboxChange} />
              <p className="text-sm">Available (online)</p>
            </div>
          </div>
          <div className="">
            <PatientSearchBar setIsSearching={setIsSearching} setSearchQuery={setSearchQuery} />
          </div>
        </section>
        <section className="mt-6">
          <div className="flex justify-start">
            <AvatarGroup total={patientsList.length}>
              <Avatar className="bg-orange-500 mt-1" variant="circular">
                <Person />
              </Avatar>
            </AvatarGroup>
          </div>
          <p className="text-sm mt-[-2px]">Incoming patients</p>
        </section>
      </div>
    </div>
  );
}

export default DoctorHome;
