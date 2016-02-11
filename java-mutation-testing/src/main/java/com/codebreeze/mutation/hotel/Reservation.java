package com.codebreeze.mutation.hotel;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;
import static java.time.LocalDateTime.now;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

public class Reservation {
    private final String number;
    private final String roomNumber;
    private final LocalDateTime from;
    private final LocalDateTime to;
    private final LocalDateTime creationTime;

    public Reservation(final String roomNumber,
                       final LocalDateTime from,
                       final LocalDateTime to) {
        final LocalDateTime now = now();
        checkState(isNotBlank(roomNumber),
                "cannot create reservation with invalid room number : [%s]", roomNumber);
        checkNotNull(from, "every reservation must have a start date/time");
        checkNotNull(to, "every reservation must have a end date/time");
        checkState(from.isBefore(to), "reservation start time must be before end time[%s][%s]", from ,to);
        checkState(now.isBefore(from.minusHours(24)),
                "cannot make a reservation less than 24 hours from its start, [%s], [%s]", from, now);
        this.number = UUID.randomUUID().toString();
        this.roomNumber = roomNumber;
        this.from = from;
        this.to = to;
        this.creationTime = now();
    }

    public String getNumber() {
        return number;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public LocalDateTime getFrom() {
        return from;
    }

    public LocalDateTime getTo() {
        return to;
    }

    public LocalDateTime getCreationTime() {
        return creationTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reservation that = (Reservation) o;
        return Objects.equals(number, that.number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(number);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Reservation{");
        sb.append("number='").append(number).append('\'');
        sb.append(", roomNumber='").append(roomNumber).append('\'');
        sb.append(", from=").append(from);
        sb.append(", to=").append(to);
        sb.append(", creationTime=").append(creationTime);
        sb.append('}');
        return sb.toString();
    }
}
