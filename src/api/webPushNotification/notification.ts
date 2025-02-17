import { axiosInstance } from "..";

export const postDeviceToken = async (deviceToken: string) => {
  try {
    const data = await axiosInstance.post("/api/users/fcm-token", {
      token: deviceToken,
    });
    return data;
  } catch (e) {
    console.error("device token post 요청 실패");
  }
};
