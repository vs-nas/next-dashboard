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

export async function getAllPeople(
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
        const where: any = {}
        if (params?.status && params?.status.length > 0) where["status"] = params?.status;
        if (params?.sort?.length) queryParams.append("sort", JSON.stringify([params?.sort]));
        if (params?.from && params?.from.length > 0 && params?.to && params?.to.length > 0) {
            where["created_at"] = {
                "$gte": formatDate(params.from, false),
                "$lte": formatDate(params.to, true)
            }
        }
        queryParams.append("where", JSON.stringify(where));
        const resp: { error: any; data: GetAllPeopleResponse } = (await API.GET(
            `/user?${queryParams.toString() || ""}`
        )) as { error: any; data: GetAllPeopleResponse };
        return resp.data;
    } catch (error: any) {
        return { error: true, data: null };
    }
}

export async function getPeopleByUid(uid: string) {
    try {
        const resp: { error: any; data: PeopleResponse } = (await API.GET(
            `/user/${uid}`
        )) as { error: any; data: PeopleResponse };
        return resp.data?.data.user;
    } catch (error: any) {
        return { error: true, data: null };
    }
}

export async function addPeople(data: z.infer<typeof AddPeopleSchema>) {
    try {
        const validatedFields = AddPeopleSchema.safeParse(data);
        if (!validatedFields.success) return { data: null, error: "Invalid Fields!" };
        const { email, name, role, password } = validatedFields.data;

        const { data: respData, error }: { error: any; data: PeopleResponse } =
            (await API.POST("/user", { email, name, role, password })) as
            { error: any; data: PeopleResponse };
        if (error) {
            return { data: respData, error };
        } else {
            revalidatePath('/(authenticated)/people', "layout")
            return { data: respData.data, error: false };
        }

    } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
    }
}