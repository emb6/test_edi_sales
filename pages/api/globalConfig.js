// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getRequest } from "../../services/axiosNext";

export async function getData(params) {
  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
  const response = await getRequest(`/sales/v1/globalconfig?${query}`);
  const jsonData = await response.data;
  return jsonData;
}

export default async function handler(req, res) {
  let response = "";
  if (req.method === 'GET') {
    response = await getData(req.query);
  }
  res.status(200).json({response});

}
