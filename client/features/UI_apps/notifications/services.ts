import { serverRequest } from "../../../configs/axios";
import { routes } from "../../../configs/serverRoutes";
import { NotificationStruct, page } from "./types";

export const getNotifications = async (
  page: page
): Promise<NotificationStruct[]> => {
  try {
    const result = await serverRequest.get(
      `${routes.user.notifications}/${page}`
    );
    return result.data;
  } catch (err) {
    throw err;
  }
};
