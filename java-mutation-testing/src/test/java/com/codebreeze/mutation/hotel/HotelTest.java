package com.codebreeze.mutation.hotel;

import org.hamcrest.Description;
import org.hamcrest.Factory;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.junit.Test;

import java.time.LocalDateTime;

import static java.time.LocalDateTime.now;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.*;
import static com.codebreeze.mutation.hotel.HotelTest.DoesNotFail.doesNotFail;

public class HotelTest {

    @Test
    public void can_make_a_reservation() throws Exception {
        //given
        final String roomNumber = "0";
        final int roomCount = 4;
        final LocalDateTime targetFrom = now().plusDays(2); // remember cannot reserve less than 24 hours from start time
        final LocalDateTime targetTo = targetFrom.plusDays(2);

        //when
        final Hotel hotel = new Hotel(roomCount);
        final Reservation reservation = hotel.reserve(roomNumber, targetFrom, targetTo);

        //then
        assertThat(reservation, notNullValue());
        assertThat(reservation.getRoomNumber(), equalTo("0"));
        assertThat(reservation.getFrom(), equalTo(targetFrom));
        assertThat(reservation.getTo(), equalTo(targetTo));
    }

    @Test
    public void can_cancel_a_reservation() throws Exception {
        //given
        final int roomCount = 4;
        final Hotel hotel = new Hotel(roomCount);
        final Reservation reservation = makeAReservation(hotel);

        //when
        final Runnable reservationCancellation = () -> hotel.cancel(reservation.getNumber());

        //then
        assertThat(reservationCancellation, doesNotFail());
    }

    private Reservation makeAReservation(Hotel hotel) {
        final String roomNumber = "0";
        final LocalDateTime targetFrom = now().plusDays(2); // remember cannot reserve less than 24 hours from start time
        final LocalDateTime targetTo = targetFrom.plusDays(2);
        final Reservation reservation = hotel.reserve(roomNumber, targetFrom, targetTo);
        return reservation;
    }

    protected static class DoesNotFail extends TypeSafeMatcher<Runnable>{
        private Exception exceptionCaught;

        @Override
        protected boolean matchesSafely(final Runnable item) {
            try {
                item.run();
                return true;
            }catch (Exception exception){
                exceptionCaught = exception;
                return false;
            }
        }

        @Override
        public void describeTo(Description description) {
            description.appendText(String.format("should have not thrown exception, but it did [%s]", exceptionCaught));
        }

        @Factory
        public static  Matcher<Runnable> doesNotFail(){
            return new DoesNotFail();
        }
    }
}