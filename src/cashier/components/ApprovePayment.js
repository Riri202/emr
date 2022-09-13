/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import DropdownButton from '../../common-components/DropdownButton';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import { getAllStaff } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

function ApprovePayment({ user }) {
  const [ListItems, setListItems] = useState([]);
  const [staffName, setStaffName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isSending, setIsSending] = useState(false);

  const getPharmacists = (allStaff) => {
    const allPharmacists = allStaff.rows.filter((staff) => staff.role === 'PHARMACIST');
    setListItems([...allPharmacists]);
  };

  const getStaff = async () => {
    const page = 0;
    const size = 20;
    if (user) {
      setAuthToken(user.token);
    }
    try {
      const { data } = await getAllStaff(page, size);
      if (data) {
        getPharmacists(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChoice = (event) => {
    setStaffName(event.target.value);
  };
  useEffect(() => {
    getStaff();
  }, []);
  return (
    <div className="w-full flex flex-row space-x-6 justify-start mt-3 mb-3">
      <div className="w-1/4">
        <DropdownButton
          choice={staffName}
          menuItems={ListItems.map((item) => item.fullName)}
          onChange={handleChoice}
        />
      </div>
      <IntuitiveButton text="Approve payment and send" isLoading={isSending} />
    </div>
  );
}

export default ApprovePayment;
