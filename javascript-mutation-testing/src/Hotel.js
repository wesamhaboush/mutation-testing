var checkArgument = require('conditional').checkArgument;
var _ = require('underscore');

var Room = (function (number) {
    return {
        number: number
    };
})(number);

var Reservation = (function (number, roomNumber, from, to, creationTime) {
    return {
        number: number,
        roomNumber: roomNumber,
        from: from,
        to: to,
        creationTime: new Date()
    };
})(number, roomNumber, from, to);

var Hotel = (function (roomCount) {
    var makeRooms = function () {
        var rooms = [];
        _.each(_.range(0, roomCount), function (number) {
            rooms.push(Room(number))
        });
        return rooms;
    };

    var availableRooms = makeRooms();
    var reservations = [];

    var hasNumber = function (number) {
        return function (r) {
            return r.getNumber() === number;
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
        var reservation = Reservation(roomNumber, from, to);
        reservations.push(reservation);
        return reservation;
    };

    var cancel = function (reservationNumber) {
        var reservation = _.find(reservations, hasNumber(reservationNumber));
        checkArgument(reservation !== undefined, "reservation not found");
        reservations = _.reject(reservations, hasNumber(reservationNumber));
        availableRooms.push(Room(reservation.roomNumber));
    };

    return {
        cancel: cancel,
        reserve: reserve
    };
})(roomCount || 10);