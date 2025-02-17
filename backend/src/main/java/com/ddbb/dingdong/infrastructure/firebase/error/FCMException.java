package com.ddbb.dingdong.infrastructure.firebase.error;

import lombok.Getter;

@Getter
public class FCMException extends RuntimeException {
    private FCMError fcmError;

    public FCMException(FCMError fcmError) {
        super(fcmError.getDesc());
        this.fcmError = fcmError;
    }
}
