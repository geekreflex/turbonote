import React from 'react';
import moment from 'moment';

const Time = ({ time }) => {
  const timeString = moment.unix(time.seconds).fromNow();
  return <span>{timeString}</span>;
};

export default Time;
