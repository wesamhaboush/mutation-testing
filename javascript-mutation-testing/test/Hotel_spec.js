require('expectations');

describe('Hotel Specs:', function () {

    var hotel = require('../src/Hotel');

    it('should be able to reserve a room in a hotel', function () {
        var hotel1 = hotel(1);
        var reservation = hotel1.reserve(0, new Date(), new Date());
        expect(reservation.number).toEqual('1');
        expect(reservation.roomNumber).toEqual(0);
    });
});
