"use server";

import * as API from "../services/API";

import { z } from "zod";
import { ProgramCalenderSchema } from "@/schemas/program-calender-schema";
import { FormResponse } from "@/types/response-types/formReponse.type";
import { InvoiceSchema } from "@/schemas/invoice-form-schema";
import { FinalReportSchema } from "@/schemas/final-report-form-schema";
import { formatDate } from "@/lib/utils";
import { GetAllFormResponse } from "@/types/response-types/get-all-form.type";
import { FormResponseUid } from "@/types/response-types/formReponseUid.type";
import { revalidatePath } from "next/cache";
import { GetAllFormCatResponse } from "@/types/response-types/get-all-formCat.type";
import { countryResponse } from "@/types/response-types/countryReponse.type";

export async function getAllForms(
  page: number,
  limit: number,
  search: string = "",
  params?: {
    sort: any[];
    from: string;
    to: string;
    formType: string;
    user_id?: number;
  }
) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("offset", page.toString());
    queryParams.append("limit", limit.toString());
    if (search) queryParams.append("search", search);
    const where: any = {
      is_draft: false,
    };

    queryParams.append("populate", JSON.stringify(["user"]));
    if (params?.sort?.length)
      queryParams.append("sort", JSON.stringify([params?.sort]));
    if (params?.formType && params?.formType?.length)
      where["formType"] = decodeURI(params?.formType || "");
    if (params?.user_id) where["user_id"] = params?.user_id;
    if (
      params?.from &&
      params?.from.length > 0 &&
      params?.to &&
      params?.to.length > 0
    ) {
      where["submitted_on"] = {
        $gte: formatDate(params.from, false),
        $lte: formatDate(params.to, true),
      };
    }
    queryParams.append("where", JSON.stringify(where));
    const resp: { data: GetAllFormResponse; error: any } = (await API.GET(
      `/forms?${queryParams.toString() || ""}`
    )) as { error: any; data: GetAllFormResponse };
    revalidatePath("/(authenticated)/forms", "layout");
    return resp.data;
  } catch (error: any) {
    return { error: true, data: null };
  }
}

export async function getCountries() {
  try {
    const resp: { error: any; data: countryResponse } = (await API.GET(
      `/country?offset=0&limit=300`
    )) as { error: any; data: countryResponse };
    return resp.data;
  } catch (error: any) {
    return { error: true, data: null };
  }
}
export async function getAllFormCategories(
  page: number,
  limit: number,
  search: string = "",
  params?: {
    sort: any[];
    start_date: string;
    end_date: string;
  }
) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("offset", page.toString());
    queryParams.append("limit", limit.toString());
    if (params?.start_date && params?.start_date?.length)
      queryParams.append("start_date", params.start_date);
    if (params?.end_date && params?.end_date?.length)
      queryParams.append("end_date", params.end_date);
    const resp: { data: GetAllFormCatResponse; error: any } = (await API.GET(
      `/forms/list?${queryParams.toString() || ""}`
    )) as { error: any; data: GetAllFormCatResponse };
    return resp.data;
  } catch (error: any) {
    return { error: true, data: null };
  }
}
export async function getFormByUid(uid: string) {
  try {
    const resp: { data: FormResponseUid; error: any } = (await API.GET(
      `/forms/${uid}`
    )) as { data: FormResponseUid; error: any };
    // console.log(resp);
    if (resp.error) {
      return { data: resp.data, error: true };
    } else {
      return { data: resp.data?.data?.user, error: false };
    }
  } catch (error: any) {
    return { error: true, data: null };
  }
}
export async function getDashChartData(params?: {
  start_date: string;
  end_date: string;
}) {
  try {
    const queryParams = new URLSearchParams();
    if (params?.start_date && params?.start_date?.length)
      queryParams.append("start_date", params.start_date);
    if (params?.end_date && params?.end_date?.length)
      queryParams.append("end_date", params.end_date);
    const resp: { data: GetAllFormCatResponse; error: any } = (await API.GET(
      `/forms/dashboardGraph?${queryParams.toString() || ""}`
    )) as { data: GetAllFormCatResponse; error: any };
    revalidatePath("/(authenticated)/dashboard", "layout");
    if (resp.error) {
      return { data: resp.data, error: true };
    } else {
      return { data: resp.data?.data?.form, error: false };
    }
  } catch (error: any) {
    return { error: true, data: null };
  }
}

export async function getDashData() {
  try {
    const resp: { data: GetAllFormCatResponse; error: any } = (await API.GET(
      `/forms/dashboardCount`
    )) as { data: GetAllFormCatResponse; error: any };
    if (resp.error) {
      return { data: resp.data, error: true };
    } else {
      return { data: resp.data?.data?.form, error: false };
    }
  } catch (error: any) {
    return { error: true, data: null };
  }
}
export async function addProgramCalenderForm(
  data: z.infer<typeof ProgramCalenderSchema>,
  isEdit: boolean
) {
  try {
    const validatedFields = ProgramCalenderSchema.safeParse(data);
    if (!validatedFields.success)
      return { data: null, error: "Invalid Fields!" };
    const reqObj = {
      formType: "Program Calender",
      data: validatedFields.data,
      // is_draft: false,
    };
    if (!!isEdit) {
      const { data: respData, error }: { data: FormResponse; error: any } =
        (await API.PUT(`/forms/${validatedFields.data?.uid}`, reqObj)) as {
          error: any;
          data: FormResponse;
        };
      if (error) {
        return { data: respData, error };
      } else {
        return { data: respData.data, error: false };
      }
    } else {
      const { data: respData, error }: { data: FormResponse; error: any } =
        (await API.POST("/forms", reqObj)) as {
          error: any;
          data: FormResponse;
        };
      if (error) {
        return { data: respData, error };
      } else {
        revalidatePath("/(authenticated)/forms", "layout");
        return { data: respData.data, error: false };
      }
    }
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong!");
  }
}

export async function addInvoiceForm(
  data: z.infer<typeof InvoiceSchema>,
  isEdit: boolean
) {
  try {
    const validatedFields = InvoiceSchema.safeParse(data);
    if (!validatedFields.success)
      return { data: null, error: "Invalid Fields!" };
    const reqObj = {
      formType: "Invoice",
      data: validatedFields.data,
      // is_draft: false,
    };
    if (!!isEdit) {
      // reqObj.is_draft = true;
      const { data: respData, error }: { data: FormResponse; error: any } =
        (await API.PUT(`/forms/${validatedFields.data?.uid}`, reqObj)) as {
          error: any;
          data: FormResponse;
        };
      if (error) {
        return { data: respData, error };
      } else {
        revalidatePath("/(authenticated)/forms/form-details", "layout");
        return { data: respData.data, error: false };
      }
    } else {
      const { data: respData, error }: { error: any; data: FormResponse } =
        (await API.POST("/forms", reqObj)) as {
          error: any;
          data: FormResponse;
        };
      if (error) {
        return { data: respData, error };
      } else {
        revalidatePath("/(authenticated)/forms/form-details", "layout");
        return { data: respData.data, error: false };
      }
    }
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong!");
  }
}

export async function addFinalReportForm(
  data: z.infer<typeof FinalReportSchema>,
  isEdit: boolean
) {
  try {
    console.log(data);

    const validatedFields = FinalReportSchema.safeParse(data);
    if (!validatedFields.success)
      return { data: null, error: "Invalid Fields!" };
    const reqObj = {
      formType: "Final Report",
      data: validatedFields.data,
      // is_draft: false,
    };
    if (!!isEdit) {
      const { data: respData, error }: { data: FormResponse; error: any } =
        (await API.PUT(`/forms/${validatedFields.data?.uid}`, reqObj)) as {
          error: any;
          data: FormResponse;
        };
      if (error) {
        return { data: respData, error };
      } else {
        return { data: respData.data, error: false };
      }
    } else {
      const { data: respData, error }: { error: any; data: FormResponse } =
        (await API.POST("/forms", reqObj)) as {
          error: any;
          data: FormResponse;
        };
      if (error) {
        return { data: respData, error };
      } else {
        return { data: respData.data, error: false };
      }
    }
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong!");
  }
}
export async function exportAllForm(
  data: z.infer<typeof FinalReportSchema>,
  isEdit: boolean
) {
  try {
    const validatedFields = FinalReportSchema.safeParse(data);
    if (!validatedFields.success)
      return { data: null, error: "Invalid Fields!" };

    if (!!isEdit) {
      const { data: respData, error }: { error: any; data: FormResponse } =
        (await API.PUT("/form", validatedFields.data)) as {
          error: any;
          data: FormResponse;
        };
      if (error) {
        return { data: respData, error };
      } else {
        return { data: respData.data, error: false };
      }
    } else {
      const { data: respData, error }: { error: any; data: FormResponse } =
        (await API.POST("/form", validatedFields.data)) as {
          error: any;
          data: FormResponse;
        };
      if (error) {
        return { data: respData, error };
      } else {
        return { data: respData.data, error: false };
      }
    }
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong!");
  }
}

export async function deleteForm(uids: string[]) {
  try {
    const reqObj = {
      form_uids: uids,
    };
    const { data: respData, error }: { error: any; data: FormResponse } =
      (await API.POST(`/forms/delete`, reqObj)) as {
        error: any;
        data: FormResponse;
      };
    if (error) {
      return { data: respData.data, error };
    } else {
      revalidatePath("/(authenticated)/forms", "layout");
      revalidatePath("/(authenticated)/people/[peopleUid]", "layout");
      return { data: respData.data, error: false };
    }
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function exportForm(uids: string[], formType?: string, userUid?:string) {
  try {
    let reqObj = {};
    if (formType) {
      reqObj = {
        form_uids: uids,
        formType,
      };
    } else {
      reqObj = {
        form_uids: uids,
        userUid
      };
    }

    console.log(reqObj);
    const { data: respData, error }: { data: any; error: any } =
      (await API.DOWNLOAD(`/forms/exportCSV`, reqObj)) as {
        error: any;
        data: any;
      };
    console.log(respData);
    if (error) {
      return { data: respData.data, error };
    } else {
      revalidatePath("/(authenticated)/forms", "layout");
      return { data: respData, error: false };
    }
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}
