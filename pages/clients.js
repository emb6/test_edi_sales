import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ClientsListing from '../views/clients/index';
import { getClients } from '../redux/actions/clientAction';
import { getGlobalConf } from '../redux/actions/gcAction';

export default function Clients(props) {
  const dispatch = useDispatch();
  const clientData = useSelector((state) => state.clientSlice);
  const gcData = useSelector((state) => state.gcSlice);
  const loadData = (payload) => {
    
    dispatch(getClients(payload));
    
  };
  useEffect(() => {
    const payload = {
      "page": 1
    }
    props.pageName("Clients");
    dispatch(getGlobalConf());
    dispatch(getClients(payload));
  }, []);
  
  return (

    <ClientsListing
      clientData={clientData}
      loadData={loadData}
      gcData={gcData}
    />

  )
}
