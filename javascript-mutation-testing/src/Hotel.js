var checkArgument = require('conditional').checkArgument;
var _ = require('underscore');

var room = function (number) {
    return Object.freeze({
        number: number
    });
};

var reservation = function (number, roomNumber, from, to) {
    return Object.freeze({
        number: number,
        roomNumber: roomNumber,
        from: from,
        to: to,
        creationTime: new Date()
    });
};

var hotel = function (roomCount) {
    console.log(roomCount);
    checkArgument((typeof roomCount === 'number') && roomCount > 0, "room count in a hotel must be positive integer");
    var makeRooms = function () {
        var rooms = [];
        _.each(_.range(0, roomCount), function (number) {
            rooms.push(room(number))
        });
        return rooms;
    };

    var availableRooms = makeRooms();
    var reservations = [];

    var hasNumber = function (number) {
        return function (r) {
            return r.number === number;
        };
    };

    var isAvailable = function (roomNumber) {
        return _.some(availableRooms, hasNumber(roomNumber));
    };

    var makeUnavailable = function (roomNumber) {
        availableRooms = _.reject(availableRooms, hasNumber(roomNumber))
    };

    var reserve = function (roomNumber, from, to) {
        checkArgument(isAvailable(roomNumber), "room is already reserved");
        makeUnavailable(roomNumber);
        var res = reservation('1', roomNumber, from, to);
        reservations.push(res);
        return res;
    };

    var cancel = function (reservationNumber) {
        var reservation = _.find(reservations, hasNumber(reservationNumber));
        checkArgument(reservation !== undefined, "reservation not found");
        reservations = _.reject(reservations, hasNumber(reservationNumber));
        availableRooms.push(Room(reservation.roomNumber));
    };

    return Object.freeze({
        cancel: cancel,
        reserve: reserve
    });
};

module.exports = hotel;