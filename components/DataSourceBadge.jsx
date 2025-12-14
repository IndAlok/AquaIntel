// Shows whether the app is using live or mock data

import React, { useEffect, useState } from 'react';
import { Chip } from 'react-native-paper';
import dataService from '../services/dataService';

const DataSourceBadge = () => {
  const [info, setInfo] = useState(dataService.getDataSourceInfo());

  useEffect(() => {
    const interval = setInterval(() => setInfo(dataService.getDataSourceInfo()), 5000);
    return () => clearInterval(interval);
  }, []);

  const usingLive = info.usingRealData;
  const label = usingLive ? 'Live data' : 'Simulated data';
  const color = usingLive ? '#2e7d32' : '#0277bd';

  return (
    <Chip icon={usingLive ? 'cloud-check' : 'database'} style={{ alignSelf: 'flex-start', backgroundColor: color + '20' }} textStyle={{ color }}>
      {label}
    </Chip>
  );
};

export default DataSourceBadge;
