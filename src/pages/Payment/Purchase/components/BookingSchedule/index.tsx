import {
    Card,
    CardBody, CardBodyItem, CardBodyItemText,
    CardLine,
    CardTitle,
    Title,
    Wrapper
} from "@/pages/Payment/Purchase/components/BookingSchedule/styles.ts";
import CalenderIcon from "@/components/designSystem/Icons/Reservations/CalenderIcon.tsx";
import ClockIcon from "@/components/designSystem/Icons/Reservations/ClockIcon.tsx";
import LocationIcon from "@/components/designSystem/Icons/Reservations/LocationIcon.tsx";
import {formatKstDate} from "@/utils/time/formatKstDate.ts";
import {formatKstTime} from "@/utils/time/formatKstTime.ts";


interface BookingScheduleProps {
    direction: 'TO_HOME' | 'TO_SCHOOL'
    busStopName: string
    time: string
}
export default function BookingSchedule({direction, busStopName, time}: BookingScheduleProps) {

    return (
        <Wrapper>
            <Title>
                예매 일정
            </Title>
            <Card>
                <CardTitle>
                    {
                        direction === 'TO_HOME' ? '하교' : '등교'
                    }
                </CardTitle>
                <CardLine />
                <CardBody>
                    <CardBodyItem>
                        <CalenderIcon />
                        <CardBodyItemText>
                            {formatKstDate(time, 1)}
                        </CardBodyItemText>
                    </CardBodyItem>
                    <CardBodyItem>
                        <ClockIcon />
                        <CardBodyItemText>
                            {`${formatKstTime(time)} 탑승`}
                        </CardBodyItemText>
                    </CardBodyItem>
                    <CardBodyItem>
                        <LocationIcon />
                        <CardBodyItemText>
                            {busStopName}
                        </CardBodyItemText>
                    </CardBodyItem>
                </CardBody>
            </Card>
        </Wrapper>
    )
}