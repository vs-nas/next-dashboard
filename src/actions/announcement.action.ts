"use server";

import * as API from "../services/API";

import { AddPeople } from "@/types/add-people.type";
import { AddPeopleSchema } from "@/schemas/add-people-schema";
import { GetAllPeopleResponse } from "@/types/response-types/get-all-people.type";
import { People } from "@/types/people.type";
import { PeopleResponse } from "@/types/response-types/people.type";
import { formatDate } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { GetAllAnnoucementsResponse } from "@/types/response-types/get-all-announcements.type";
import { AnnoucementResponse } from "@/types/response-types/announcement.type";
import { AddAnnouncementSchema } from "@/schemas/add-announcement-schema";

export async function getAllAnnouncements(
  page: number,
  limit: number,
  search: string = "",
  params?: {
    status: string;
    sort: any[];
    from: string;
    to: string;
  }
) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("offset", page.toString());
    queryParams.append("limit", limit.toString());
    if (search) queryParams.append("search", search);
    const where: any = {};
    if (params?.status && params?.status.length > 0)
      where["status"] = params?.status;
    if (params?.sort?.length)
      queryParams.append("sort", JSON.stringify([params?.sort]));
    if (
      params?.from &&
      params?.from.length > 0 &&
      params?.to &&
      params?.to.length > 0
    ) {
      where["created_at"] = {
        $gte: formatDate(params.from, false),
        $lte: formatDate(params.to, true),
      };
    }
    queryParams.append("where", JSON.stringify(where));
    const resp: { error: any; data: GetAllAnnoucementsResponse } =
      (await API.GET(`/news?${queryParams.toString() || ""}`)) as {
        error: any;
        data: GetAllAnnoucementsResponse;
      };
    return resp.data;
  } catch (error: any) {
    return { error: true, data: null };
  }
}

export async function getAnnoucementByUid(uid: string) {
  try {
    const resp: { error: any; data: AnnoucementResponse } = (await API.GET(
      `/news/${uid}`
    )) as { error: any; data: AnnoucementResponse };
    return { data: resp.data?.data.news, error: false };
  } catch (error: any) {
    return { error: true, data: null };
  }
}

export async function updateAnnouncement(
  data: z.infer<typeof AddAnnouncementSchema>
) {
  try {
    const validatedFields = AddAnnouncementSchema.safeParse(data);
    if (!validatedFields.success)
      return { data: null, error: "Invalid Fields!" };
    const { id, uid, title, author, content, image } = validatedFields.data;

    const { data: respData, error }: { error: any; data: PeopleResponse } =
      (await API.PUT(`/news/${uid}`, { id, uid, title, author, content, image })) as {
        error: any;
        data: PeopleResponse;
      };
    if (error) {
      return { data: respData, error };
    } else {
      revalidatePath("/(authenticated)/announcements", "layout");
      return { data: respData.data, error: false };
    }
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}
