package com.codebreeze.mutation.hotel;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.function.Predicate;

import static com.google.common.base.Preconditions.checkState;
import static com.google.common.collect.Sets.newHashSet;

public class Hotel {
    private final Set<Room> availableRooms = newHashSet();
    private final Set<Reservation> reservations = newHashSet();

    public Reservation reserve(final String roomNumber,
                               final LocalDateTime from,
                               final LocalDateTime to) {
        checkState(isAvailable(roomNumber), "room [%s] is already reserved.", roomNumber);
        makeUnavailable(roomNumber);
        final Reservation reservation = new Reservation(roomNumber, from, to);
        reservations.add(reservation);
        return reservation;
    }

    public void cancel(final String reservationNumber){
        final boolean removed = reservations.removeIf(hasReservationNumber(reservationNumber));
        checkState(removed, "reservation not found [%s]", reservationNumber);
    }

    private Predicate<Reservation> hasReservationNumber(String reservationNumber) {
        return r -> r.getNumber().equals(reservationNumber);
    }

    private boolean makeUnavailable(String roomNumber) {
        return availableRooms.removeIf(hasRoomNumber(roomNumber));
    }

    private boolean isAvailable(final String roomNumber) {
        return availableRooms.stream().anyMatch(hasRoomNumber(roomNumber));
    }

    private Predicate<Room> hasRoomNumber(String roomNumber) {
        return r -> r.getNumber().equals(roomNumber);
    }
}
