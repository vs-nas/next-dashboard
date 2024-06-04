"use server";

import * as API from "../services/API";

import { User } from "@/types/user.type"

export interface ProfileResponse {
  data: {
      user:User
  }
  message:string
  timestamp:string
}

export async function getMyProfile() {
  try {
    const resp: { error: any; data: ProfileResponse } = (await API.GET(
      "/user/me"
    )) as { error: any; data: ProfileResponse };
    return resp.data?.data.user;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

