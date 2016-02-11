package com.codebreeze.mutation.hotel;

import java.util.Objects;

import static com.google.common.base.Preconditions.checkState;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

public class Room {
    private final String number;

    public Room(String number) {
        checkState(isNotBlank(number), "cannot create a room with a blank number [%s]", number);
        this.number = number;
    }

    public String getNumber(){
        return number;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return Objects.equals(number, room.number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(number);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Room{");
        sb.append("number='").append(number).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
