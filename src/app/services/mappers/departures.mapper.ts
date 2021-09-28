import { Departures } from 'src/app/models/departures';

export const mapPredictions = ({ data, included }: any): Departures[] => {
  return data
    .map((prediction: any) => {
      const { route, vehicle, stop, schedule } = prediction?.relationships;

      return {
        carrier: 'MTBA',
        time:
          prediction.attributes.departure_time ||
          getTime(schedule?.data?.id, included),
        route: route?.data?.id,
        train: vehicle?.data?.id || 'TBD',
        track: stop?.data?.id || 'TBD',
        status: prediction.attributes.status || 'Pending',
      };
    })
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
};

const getTime = (scheduleId: string, included: any): string => {
  const sch = included.find((x: any) => x.id === scheduleId);

  return sch?.attributes.departure_time || 'TBD';
};
