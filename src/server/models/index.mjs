import Address from './Address.mjs';
import Stop from './Stop.mjs';
import Ride from './Ride.mjs';
import Rider from './Rider.mjs';
import User from './User.mjs';

Stop.belongsTo(Address);

Ride.hasMany(Stop);
Ride.belongsToMany(User, { through: Rider });

export { Address, Ride, Rider, Stop, User };
