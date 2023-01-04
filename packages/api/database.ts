// @ts-ignore
import axios, { AxiosPromise } from "axios";
// @ts-ignore
import { GetOpts } from "#/interface/database";

export function getDataModel(id?: string, data?: any): AxiosPromise {
  return axios.get(id ? `/basic-data/model/${id}` : "/basic-data/model", {
    params: data,
  });
}

export function getData(id: string, opts?: GetOpts): AxiosPromise {
  return axios.get(`/basic-data/${id}`, {
    params: opts,
  });
}

export function updateDatabase(
  id: string,
  data: { data: Record<string, any>[] }
): AxiosPromise {
  return axios.post(`/basic-data/${id}/update`, data);
}

export function addDatabase(
  id: string,
  data: {
    data: { name: string; [key: string]: any }[];
  }
): AxiosPromise {
  return axios.post(`/basic-data/${id}/create`, data);
}

export function delDatabase(
  id: string,
  data: { data: number[] }
): AxiosPromise {
  return axios.post(`/basic-data/${id}/delete`, data);
}

export function getHistoryModel(id?: string): AxiosPromise {
  return axios.get(id ? `/history-data/model/${id}` : "/basic-data/model");
}

export function getHistoryData(id: string, opts?: GetOpts): AxiosPromise {
  return axios.get(`/history-data/${id}`, {
    params: opts,
  });
}

export function backupDatabase(): AxiosPromise {
  return axios.get("/basic-data/backup");
}

export function exportDatabase2Csv(id: string): AxiosPromise {
  return axios.get(`/basic-data/csv/${id}`);
}

export function importCsv2Database(id: string, param: FormData): AxiosPromise {
  return axios.post(`/basic-data/csv/${id}`, param, {
    headers: {
      "content-type": "text/csv",
    },
  });
}

export function exportConfig(): AxiosPromise {
  return axios.get("/analysisconfig/export");
}

export function importConfig(param: FormData): AxiosPromise {
  return axios.post("/analysisconfig/import", param, {
    headers: {
      "content-type": "application/x-gzip",
    },
  });
}

export function syncOnvif(): AxiosPromise {
  return axios.post("/ptz/update-onvif-token");
}
