import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DashboardContainer from '../views/dashboard';
import { getDashboard } from '../redux/actions/dashboardAction';
import { getGlobalConf } from '../redux/actions/gcAction';

export default function Home(props) {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboardSlice);
  const gcData = useSelector((state) => state.gcSlice);
  const loadData = () => {
    dispatch(getDashboard());
    dispatch(getGlobalConf());
  };
  useEffect(() => {
    props.pageName("Dashboard");
    loadData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <DashboardContainer 
      dashboardData={dashboardData}
      gcData={gcData}
      />
    </>
  )
}