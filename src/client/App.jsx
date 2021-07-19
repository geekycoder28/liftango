import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Button from './components/Button';
import Map from './components/Map';
import './app.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px;
  gap: 20px;
`;

const ButtonGroup = styled.div`
  flex: 0 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const MapContainer = styled.div`
  flex: 1 0 auto;
`;

const App = () => {
  const [formattedTrips, setFormattedTrips] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const flatTrip = (trip) => {
    // function to flat the stop
    const result = [];

    if (!trip || !trip.stops || !trip.stops.length) {
      return result;
    }
    trip.stops.forEach((stop) => {
      const record = {
        ...trip,
        stop,
      };
      delete record.stops;
      result.push(record);
    });

    return result;
  };
  const validateTrips = (trips) => {
    // function to remove the duplication of address & check the stop type
    // check if the departure and arrival are in the same date and mark as completed
    const addressMap = {};
    const result = [...trips];
    const removableIndexes = [];

    trips.forEach((trip, index) => {
      const { addressId, type } = trip.stop;

      if (!addressMap[addressId]) {
        addressMap[addressId] = {
          index,
          type,
        };
      } else if (addressMap[addressId].type === type) {
        removableIndexes.push(index);
      } else {
        result[index].stop.type = 'completed';
        removableIndexes.push(addressMap[addressId].index);
      }
    });

    return result.filter((trip, index) => !removableIndexes.includes(index));
  };
  const processTrips = (trips) => {
    // function to group by date & calc num of rides
    if (!trips || !trips.length) {
      return {};
    }
    const result = {};
    trips.forEach((trip) => {
      const date = moment(trip.startTime).utcOffset(trip.startTime).format('YYYY-MM-DD');
      if (!result[date]) {
        result[date] = { data: [...flatTrip(trip)] };
      } else {
        result[date].data.push(...flatTrip(trip));
      }
    });
    Object.keys(result).forEach((key) => {
      result[key].data = validateTrips(result[key].data);
      const numRides = result[key].data.reduce((cur, trip) => (cur + ['departure', 'completed'].includes(trip.stop.stype) ? 1 : 0), 0);
      result[key].numRides = numRides;
    });

    return result;
  };

  useEffect(() => {
    setLoading(true);
    fetch('/api/trip/getTrips')
      .then((res) => res.json())
      .then((res) => setFormattedTrips(processTrips(res.trips)))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const dates = Object.keys(formattedTrips);

    if (dates.length) {
      setSelectedDate(dates[0]);
    } else {
      setSelectedDate(null);
    }
  }, [formattedTrips]);

  if (loading) {
    return <Container>Loading ...</Container>;
  }

  if (error) {
    return <Container>Error Found!</Container>;
  }

  return (
    <Container>
      <ButtonGroup>
        {Object.keys(formattedTrips).map((date) => (
          <Button key={date} label={date} isSelected={date === selectedDate} onClick={() => setSelectedDate(date)} />
        ))}
      </ButtonGroup>
      <MapContainer>
        <Map
          data={selectedDate ? formattedTrips[selectedDate].data : []}
          date={selectedDate}
          numRides={selectedDate ? formattedTrips[selectedDate].numRides : 0}
        />
      </MapContainer>
    </Container>
  );
};

export default App;
