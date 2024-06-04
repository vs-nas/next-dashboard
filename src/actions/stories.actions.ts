"use server";

import * as API from "../services/API";

import { AddStorySchema } from "@/schemas/add-story-schema";
import { GetAllStoriesResponse } from "@/types/response-types/get-all-stories.type";
import { StoryResponse } from "@/types/response-types/stories.type";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getAllStories(
    page: number,
    limit: number,
    search: string = "",
    params?: {
        language: string;
        categories: string;
        sort: any[];
    }
) {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append("offset", page.toString());
        queryParams.append("limit", limit.toString());
        if (search) queryParams.append("search", search);
        const where: any = {}
        if (params?.language && params?.language.length > 0) where["language"] = params?.language;
        if (params?.categories && params?.categories.length > 0) where["categories"] = params?.categories;
        queryParams.append("where", JSON.stringify(where));
        if (params?.sort?.length)
            queryParams.append("sort", JSON.stringify([params?.sort]));
        const resp: { error: any; data: GetAllStoriesResponse } = (await API.GET(
            `/stories?${queryParams.toString() || ""}`
        )) as { error: any; data: GetAllStoriesResponse };
        return resp.data;
    } catch (error: any) {
        return { error: true, data: null };
    }
}

export async function addStory(data: z.infer<typeof AddStorySchema>) {
    try {
        const validatedFields = AddStorySchema.safeParse(data);
        if (!validatedFields.success) return { data: null, error: "Invalid Fields!" };
        const { title, author, categories, themes, language, date_of_publication, doc, image } = validatedFields.data;

        const { data: respData, error }: { error: any; data: StoryResponse } =
            (await API.POST("/stories", { title, author, categories, themes, language, date_of_publication, doc, image })) as
            { error: any; data: StoryResponse };
        if (error) {
            return { data: respData.data, error };
        } else {
            revalidatePath('/(authenticated)/stories', "layout")
            return { data: respData.data, error: false };
        }

    } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
    }
}
export async function editStory(data: z.infer<typeof AddStorySchema>) {
    try {
        const validatedFields = AddStorySchema.safeParse(data);
        if (!validatedFields.success) return { data: null, error: "Invalid Fields!" };
        const { uid, title, author, categories, themes, language, date_of_publication, doc, image } = validatedFields.data;
        const { data: respData, error }: { error: any; data: StoryResponse } =
            (await API.PUT(`/stories/${uid}`, { title, author, categories, themes, language, date_of_publication, doc, image })) as
            { error: any; data: StoryResponse };
        if (error) {
            return { data: respData.data, error };
        } else {
            revalidatePath('/(authenticated)/stories', "layout")
            return { data: respData.data, error: false };
        }

    } catch (error: any) {
        return { data: null, error: true };
    }
}
export async function deleteStory(uid: string) {
    try {

        const { data: respData, error }: { error: any; data: StoryResponse } =
            (await API.DELETE(`/stories/${uid}`)) as
            { error: any; data: StoryResponse };
        if (error) {
            return { data: respData.data, error };
        } else {
            revalidatePath('/(authenticated)/stories', "layout")
            return { data: respData.data, error: false };
        }

    } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
    }
}

export async function getStoryByUid(uid: string) {
    try {
        const resp: { error: any; data: StoryResponse } = (await API.GET(
            `/stories/${uid}`
        )) as { error: any; data: StoryResponse };
        return resp.data?.data.stories;
    } catch (error: any) {
        return { error: true, data: null };
    }
}

export const handleFileUpload = async (fileName: string) => {
    try {
        const signedUrl = await API.POST("/user/getSignedURL", {
            keys: [fileName],
        });

        return { data: signedUrl, error: false };
    } catch (error) {
        return { error: true, data: null };
    }
};