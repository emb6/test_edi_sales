// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getRequest, postRequest, putRequest, deleteRequest } from "../../services/axiosNext";

export async function getData(params) {
  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
  const response = await getRequest(`/sales/v1/pot-listing?${query}`);
  //const response = await getRequest(`/v1/sales/clients?${query}`);
  const jsonData = await response.data;
  return jsonData;
}

export async function postData(param) {
  const response = await postRequest('/sales/v1/pot-upload', param);
  const jsonData = await response.data;
  return jsonData;
}


export default async function handler(req, res) {
  let response = "";
  if (req.method === 'POST') {
    response = await postData(req.body);
  }
  else if (req.method === 'GET') {
    response = await getData(req.query);
  }
  res.status(200).json(response);

}
