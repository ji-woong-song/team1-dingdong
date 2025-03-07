package com.ddbb.dingdong.application.usecase.notification;

import com.ddbb.dingdong.application.common.Params;
import com.ddbb.dingdong.application.common.UseCase;
import com.ddbb.dingdong.domain.notification.entity.vo.NotificationType;
import com.ddbb.dingdong.domain.notification.repository.NotificationQueryRepository;
import com.ddbb.dingdong.domain.notification.repository.projection.NotificationProjection;
import com.ddbb.dingdong.domain.notification.service.NotificationManagement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class GetNotificationsUseCase implements UseCase<GetNotificationsUseCase.Param, GetNotificationsUseCase.Result> {
    private final NotificationQueryRepository notificationQueryRepository;
    private final NotificationManagement notificationManagement;

    @Transactional
    @Override
    public Result execute(Param param) {
        Long userId = param.getUserId();
        Pageable pageable = param.getPageable();
        Page<Result.NotificationInfo> notificationInfos = getNotifications(userId, pageable);
        notificationManagement.readAllNotifications(userId);

        return new Result(new PagedModel<>(notificationInfos));
    }

    private Page<Result.NotificationInfo> getNotifications(Long userId, Pageable pageable) {
        Page<NotificationProjection> projections = notificationQueryRepository.queryUserNotifications(userId, pageable);

        return projections.map(projection -> {
            Result.ReservationInfo reservationInfo  = null;
            if(!projection.getType().equals(NotificationType.WELCOME)) {
                reservationInfo = new Result.ReservationInfo(
                        projection.getReservationId(),
                        projection.getStartStationName(),
                        projection.getEndStationName(),
                        projection.getStartDate(),
                        projection.getExpectedStartTime(),
                        projection.getExpectedEndTime()
                );
            }
            return
                    new Result.NotificationInfo(
                            projection.getType(),
                            projection.getTimeStamp(),
                            projection.getIsRead(),
                            projection.getMoney(),
                            reservationInfo
                    );
                }
        );
    }

    @Getter
    @AllArgsConstructor
    public static class Param implements Params {
        private Long userId;
        private Pageable pageable;
    }

    @Getter
    @AllArgsConstructor
    public static class Result {
        private PagedModel<NotificationInfo> notifications;

        @Getter
        @AllArgsConstructor
        public static class NotificationInfo {
            private NotificationType type;
            private LocalDateTime timeStamp;
            private boolean isRead;
            private Integer money;
            private ReservationInfo reservationInfo;
        }

        @Getter
        @AllArgsConstructor
        public static class ReservationInfo {
            private Long reservationId;
            private String startStationName;
            private String endStationName;
            private LocalDate startDate;
            private LocalDateTime expectedStartTime;
            private LocalDateTime expectedEndTime;
        }
    }
}
