import { sm3Digest } from "./encrypt";
import axios from "axios";

export async function downloadFile(url, filename, timeout = 120000) {
  const aEle = document.createElement('a')
  const xsstamp = new Date().getTime()
  const xsrandom = Math.round(Math.random() * 10000)
  const xscheck = sm3Digest(`###sx###${xsstamp}${xsrandom}`)
  if (/\?/.test(url)) url = url + `&xsstamp=${xsstamp}&xsrandom=${xsrandom}&xscheck=${xscheck}`
  else url = url + `?xsstamp=${xsstamp}&xsrandom=${xsrandom}&xscheck=${xscheck}`
  const blob = (
    await axios({
      url, responseType: 'blob',
      headers: { token: sessionStorage.getItem('token') || undefined }
    })).data
  const path = window.URL.createObjectURL(blob)
  aEle.setAttribute('href', path)
  aEle.setAttribute('download', filename)
  aEle.click()
  aEle.remove()
}

export default {
  downloadFile,
}
