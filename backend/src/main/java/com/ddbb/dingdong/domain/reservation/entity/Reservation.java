package com.ddbb.dingdong.domain.reservation.entity;

import com.ddbb.dingdong.domain.payment.WalletHistory;
import com.ddbb.dingdong.domain.reservation.entity.vo.BusDirection;
import com.ddbb.dingdong.domain.reservation.entity.vo.ReservationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BusDirection busDirection;

    @Column(nullable = false)
    private LocalDateTime startDate;

    private LocalDateTime departureTime;

    private LocalDateTime arrivalTime;

    @Column(nullable = false)
    private ReservationStatus status;

    @Column(nullable = false)
    private Boolean isDeleted = false;

    @Column(nullable = false)
    private Long userId;

    @OneToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;
}
