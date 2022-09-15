/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import DropdownButton from '../../common-components/DropdownButton';
import IntuitiveButton from '../../common-components/IntuitiveButton';
import { approvePayment } from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { toast } from 'react-toastify';

function ApprovePayment({ user, amount, sessionId, patientId }) {
  // eslint-disable-next-line no-unused-vars
  const [isSending, setIsSending] = useState(false);

  const approvePaymentByCashier = async () => {
    setIsSending(true);
    const requestData = { amount, sessionId, patientId };
    console.log(requestData);
    if (user) {
      setAuthToken(user.token);
    }

    try {
      const { data } = await approvePayment(requestData);
      setIsSending(false);
      console.log(data);
      toast.success('Payment approved succesfully');
    } catch (error) {
      setIsSending(false);
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full mt-3 mb-3">
      <IntuitiveButton
        onClick={approvePaymentByCashier}
        text="Approve payment"
        isLoading={isSending}
      />
    </div>
  );
}

export default ApprovePayment;
