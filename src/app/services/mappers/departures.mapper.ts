import { Departures } from 'src/app/models/departures';

export const mapPredictions = (predictions: any[]): Departures[] => {
  return predictions.map((prediction) => {
    return {
      carrier: 'MTBA',
      time: prediction.attributes.departure_time || 'TBD',
      route: prediction?.relationships?.route?.data?.id,
      train: prediction?.relationships?.vehicle?.data?.id || 'TBD',
      track: prediction?.relationships?.stop?.data?.id || 'TBD',
      status: prediction.attributes.status || 'Pending',
    };
  });
};
