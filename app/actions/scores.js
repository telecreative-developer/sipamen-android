import _ from 'lodash'
import { API_SERVER } from '../env'
import { RECEIVED_SCORES } from '../constants'
import { setLoading, setFailed, setSuccess } from './processor'

const stdev = (arr) => {
  var n = arr.length;
  var sum = 0;

  arr.map(function(data) {
    sum+=data;
  });

  var mean = sum / n;

  var variance = 0.0;
  var v1 = 0.0;
  var v2 = 0.0;

  if (n != 1) {
    for (var i = 0; i<n; i++) {
      v1 = v1 + (arr[i] - mean) * (arr[i] - mean);
      v2 = v2 + (arr[i] - mean);
    }

    v2 = v2 * v2 / n;
    variance = (v1 - v2) / (n-1);
    if (variance < 0) { variance = 0; }
    stddev = Math.sqrt(variance);
  }

  return Math.round(stddev*100)/100;
};

export const fetchScores = (user_id, accessToken) => {
	return async dispatch => {
    await dispatch(setLoading(false, 'LOADING_FETCH_SCORES'))
    try {
      const response = await fetch(`${API_SERVER}/scores`, {
        method: 'GET',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {
          Authorization: accessToken
        }
      })
      const data = await response.json()
      const responseTeam = await fetch(`${API_SERVER}/teams?id=${user_id}`, {
        method: 'GET',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {
          Authorization: accessToken
        }
      })
      const dataTeam = await responseTeam.json()
      const responseTeams = await fetch(`${API_SERVER}/teams?team=${dataTeam.data[0].team}`, {
        method: 'GET',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {
          Authorization: accessToken
        }
      })
      const dataTeams = await responseTeams.json()
      let nak = await data.data.filter(d => d.id === user_id).map(d => (parseFloat(d.nilai_murni_narasumber_1_nr1) + parseFloat(d.nilai_murni_narasumber_2_nr2)) / parseFloat(2))
      let nrk = await data.data.filter(d => d.team === dataTeam.data[0].team).map(d => (parseFloat(d.nilai_murni_narasumber_1_nr1) + parseFloat(d.nilai_murni_narasumber_2_nr2)) / 2).reduce((a, b) => parseFloat(a)+parseFloat(b) / dataTeams.data.length, 0).toFixed(3)
      let pks = await parseFloat(parseFloat(nak) - parseFloat(nrk)).toFixed(3)
      let spk = await stdev(data.data.filter(d => d.team === dataTeam.data[0].team).map(d => (parseFloat(d.nilai_murni_narasumber_1_nr1) + parseFloat(d.nilai_murni_narasumber_2_nr2)) / parseFloat(2)))
      let nrgGroup = await _.chain(data.data).groupBy('team').map((value, key) => ({team: key, nrk: data.data.filter(d => d.team === parseInt(key)).map(d => (parseFloat(d.nilai_murni_narasumber_1_nr1) + parseFloat(d.nilai_murni_narasumber_2_nr2)) / 2).reduce((a, b) => parseFloat(a)+parseFloat(b) / dataTeams.data.length, 0).toFixed(3)})).value()
      let nrg = await parseFloat(nrgGroup.map(d => parseFloat(d.nrk)).reduce((a, b) => a+b) / nrgGroup.length)
      let spp = await parseFloat(parseFloat(pks) / parseFloat(spk)).toFixed(3)
      let nad = await parseFloat(parseFloat(nrg) + parseFloat(spp)).toFixed(3)
      await dispatch(receivedScores({nrk, nad}))
      await dispatch(setSuccess(true, 'SUCCESS_FETCH_SCORES'))
			await dispatch(setLoading(false, 'LOADING_FETCH_SCORES'))
    }catch(e) {
      console.log(e)
      dispatch(setFailed(true, 'SUCCESS_FETCH_SCORES', e))
			dispatch(setLoading(false, 'LOADING_FETCH_SCORES'))
    }
  }
}

const receivedScores = data => ({
	type: RECEIVED_SCORES,
	payload: data
})