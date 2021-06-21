import { useEffect, useState } from "react"
import { baseUrl } from "./baseUrl";

export const useGetRequests = () => {
  const [ data, setData ] = useState([]);
  const getRequests = async() => {
    const response = await fetch(`${baseUrl}/api/v1/requests`);
    const requests = await response.json();
    setData(requests);
  }
  useEffect(() => {
    getRequests();
  }, [])
  return [data];
}

export const useGetRequestById = (id) => {
  const [ data, setData ] = useState({});
  const [loading, setLoading] = useState(false);
  const getRequest = async() => {
    setLoading(true);
    const response = await fetch(`${baseUrl}/api/v1/requests/${id}`);
    const request = await response.json();
    setData(request);
    setLoading(false);
  }
  useEffect(() => {
    getRequest();
    return () => setLoading(false);
  },[id])
  return [loading ,data];
}