import React from 'react';
import { Card, Typography } from '@material-tailwind/react';
import { Archive } from 'react-feather';
import { missingPorperties } from '../../utils/utils';

const EmptyComponent = () => {
  return (
    <Card {...missingPorperties} className="flex flex-col items-center justify-center shadow-none h-64 w-full bg-gray-50 p-4">
      {/* SVG Icon of an Empty Box */}
      <Archive size={50} className='my-4' />

      {/* Placeholder Text */}
      <Typography  {...missingPorperties} variant="h5" color="gray">
        Sorry, there is no content available
      </Typography>
      <Typography  {...missingPorperties} variant="paragraph" color="gray" className="mt-2">
        Add new holding, for it to apear 
      </Typography>
    </Card>
  );
};

export default EmptyComponent;
