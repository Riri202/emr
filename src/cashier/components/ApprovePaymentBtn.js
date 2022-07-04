/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Grow, Chip, CircularProgress, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DropdownButton from '../../common-components/DropdownButton';

function ApprovePaymentBtn({ amount }) {
  // state for changing button color when payment is approved
  const [isPaymentApproved, setIsPaymentApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApprovePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsPaymentApproved(true);
      setIsLoading(false);
    }, 6000);
  };
  return (
    <div>
      {!isPaymentApproved ? (
        <Box sx={{ position: 'relative' }}>
          <Button
            disabled={isLoading}
            onClick={handleApprovePayment}
            className="p-2 mt-1 bg-green-500 text-[#000] ml-3">
            Approve payment of&nbsp;
            <span> &#8358;</span>
            {amount}
          </Button>
          {isLoading && (
            <CircularProgress
              color="success"
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 1,
                marginTop: '-12px',
                marginLeft: '-12px'
              }}
            />
          )}
        </Box>
      ) : (
        <>
          <Grow in={isPaymentApproved}>
            <div className="flex flex-col">
              <Chip
                label="Payment has been approved by Cashier Rose"
                icon={<CheckCircleIcon />}
                color="success"
              />
              <Box className="flex justify-end mt-3 bg-white p-1">
                <DropdownButton btnText="send to" menuItems={['dr. Stark', 'Dr Drake Remurray']} />
              </Box>
            </div>
          </Grow>
        </>
      )}
    </div>
  );
}

export default ApprovePaymentBtn;
