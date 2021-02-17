import React, { useReducer } from 'react';
import SourceContext from './sourceContext';
import SourceReducer from './sourceReducer';
import api from '../../api/api';
import { 
  GET_SOURCES, 
  CREATE_SOURCE, 
  GET_SOURCE, 
  DELETE_SOURCE, 
  UPDATE_SOURCE, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING
} from '../types';

const SourceState = props => {
  const initialState = {
    sources: [],
    source: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(SourceReducer, initialState);

  //Get Sources
  const getSources = async () => {
    setLoading();
    try {
      const res = await api.get(`/sources?sort=name`);

      dispatch({ type: GET_SOURCES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

   //Get Source
   const getSource = async (sourceId) => {
    clearState();
    setLoading();
    try {
      const res = await api.get(`/sources/${sourceId}`);
      dispatch({ type: GET_SOURCE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Delete Source
  const deleteSource = async (sourceId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.delete(`/sources/${sourceId}`, config);
      dispatch({ type: DELETE_SOURCE, payload: res.data.deletedId })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };


  //Create Source
  const createSource = async (source) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      const res = await api.post(`/sources`, { ...source }, config);
      dispatch({ type: CREATE_SOURCE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  }

  //Update Source
  const updateSource = async (source, sourceId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      
      const res = await api.put(`/sources/${sourceId}`, {...source} ,config);
      dispatch({ type: UPDATE_SOURCE, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <SourceContext.Provider
      value={{
        loading: state.loading,
        sources: state.sources,
        source: state.source,
        error: state.error,
        getSources,
        createSource,
        getSource,
        deleteSource,
        updateSource,
        clearState,
        setLoading
      }}
    >
      {props.children}
    </SourceContext.Provider>
  );
};

export default SourceState;
