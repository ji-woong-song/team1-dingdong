import TimePickerWheel, {TimeWheelHandle} from "@/components/TimePickerWheel";
import {
    Backdrop,
    ButtonWrapper,
    LeftButton, LeftText,
    Modal, RightButton, RightText,
    Title
} from "@/pages/TimetableManagement/components/TimePicker/styles.ts";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";

interface TimePickerProps {
    unmountModal: () => void
    timeState: string;
    setTimeState: Dispatch<SetStateAction<string>>;
}
export default function TimePicker({unmountModal, timeState, setTimeState}: TimePickerProps) {
    const [isMount, setIsMount] = useState(false);
    const timeWheelRef = useRef<TimeWheelHandle>(null)

    useEffect(() => {
        setIsMount(true);
    }, []);

    const unmountModalTimer = () => {
        if (timeWheelRef.current) {
            const {amPm, hour, minute} = timeWheelRef.current.getSelectedTime()
            const hour24 = (amPm === '오후' ? +hour + 12 : +hour).toString().padStart(2, '0');
            setTimeState(`${hour24}:${minute}`)
        }
        setIsMount(false);
        setTimeout(() => unmountModal(), 200);
    }


    return (
        <Backdrop>
            <Modal isMount={isMount}>
                <Title>
                    시간을 선택하세요.
                </Title>
            <TimePickerWheel ref={timeWheelRef} initTime={timeState !== '-' ? {initHour: Number(timeState.split(':')[0]) - 1, initMinute: Number(timeState.split(':')[1]) === 30 ? 1 : 0} : undefined}/>
            <ButtonWrapper>
                <LeftButton onClick={() => {
                    unmountModalTimer()
                }}>
                    <LeftText>
                        취소
                    </LeftText>
                </LeftButton>
                <RightButton onClick={() => {
                    unmountModalTimer()
                }}>
                    <RightText>
                        확인
                    </RightText>
                </RightButton>
            </ButtonWrapper>
            </Modal>
        </Backdrop>
    )
}