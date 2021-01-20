import React, { useReducer } from 'react';
import ActivityContext from './activityContext';
import ActivityReducer from './activityReducer';
import api from '../../api/api';
import { 
  GET_ACTIVITIES, 
  CREATE_ACTIVITY, 
  GET_ACTIVITY, 
  DELETE_ACTIVITY, 
  UPDATE_ACTIVITY, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
  GET_ACTIVITIES_BY_USER,
  GET_ACTIVITIES_BY_LEAD,
  GET_ACTIVITIES_AR,
  GET_ACTIVITIES_BY_OMSGLOBAL,
  GET_ACTIVITIES_BY_QUESTLEAD
} from '../types';

const ActivityState = props => {
  const initialState = {
    activities: [],
    activity: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(ActivityReducer, initialState);

  //Get Activities
  const getActivities = async () => {
    clearState();
    setLoading();
    try {
      const res = await api.get(`/activities`);
      dispatch({ type: GET_ACTIVITIES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get Activities By User
  const getActivitiesByUser = async (userId) => {
    clearState();
    setLoading();
    try {
      const res = await api.get(`users/${userId}/activities`);
      dispatch({ type: GET_ACTIVITIES_BY_USER, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get Activities By lead
  const getActivitiesByLead = async (leadId) => {
    clearState();
    setLoading();
    try {
      const res = await api.get(`leads/${leadId}/activities`);
      dispatch({ type: GET_ACTIVITIES_BY_LEAD, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  const getActivitiesByOmsGlobal = async (omsGlobalId) =>{
    clearState();
    setLoading();
    try {
      const res = await api.get(`omsGlobals/${omsGlobalId}/activities`);
      dispatch({ type: GET_ACTIVITIES_BY_OMSGLOBAL, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  const getActivitiesByQuestLead = async (questLeadId) =>{
    clearState();
    setLoading();
    try {
      const res = await api.get(`questLeads/${questLeadId}/activities`);
      dispatch({ type: GET_ACTIVITIES_BY_QUESTLEAD, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

   //Get Activity
   const getActivity = async (activityId) => {
    setLoading();
    try {
      const res = await api.get(`/activities/${activityId}`);
      dispatch({ type: GET_ACTIVITY, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Delete Activity
  const deleteActivity = async (activityId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      
      const res = await api.delete(`/activities/${activityId}`, config);
      dispatch({ type: DELETE_ACTIVITY, payload: res.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Create Activity
  const createActivity = async (activity) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      const res = await api.post(`/activities`, {...activity}, config);
      dispatch({ type: CREATE_ACTIVITY, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  }

  //Update Activity
  const updateActivity = async (activity, activityId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.put(`/activities/${activityId}`, {...activity} ,config);
      dispatch({ type: UPDATE_ACTIVITY, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get activities AdvancedResults
  const getActivitiesAR = async (search) =>{
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.get(`/activities${search}` ,config);
      dispatch({ type: GET_ACTIVITIES_AR, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  }

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ActivityContext.Provider
      value={{
        loading: state.loading,
        activities: state.activities,
        activity: state.activity,
        error: state.error,
        getActivities,
        createActivity,
        getActivity,
        deleteActivity,
        updateActivity,
        clearState,
        setLoading,
        getActivitiesByUser,
        getActivitiesByLead,
        getActivitiesAR,
        getActivitiesByOmsGlobal,
        getActivitiesByQuestLead
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  );
};

export default ActivityState;
