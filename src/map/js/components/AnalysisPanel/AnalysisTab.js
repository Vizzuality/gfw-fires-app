import {analysisPanelText} from 'js/config';
import {analysisActions} from 'actions/AnalysisActions';
import {mapStore} from 'stores/MapStore';
import AnalysisComponent from 'components/LayerPanel/AnalysisComponent';
import React from 'react';
import Chosen from 'chosen';

export default class AnalysisTab extends React.Component {

  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    this.state = mapStore.getState();
  }

  storeUpdated () {
    this.setState(mapStore.getState());
  }

  componentDidMount () {
    let calendar = new window.Kalendae(this.refs.date, {
      mode: 'range'
    });
    calendar.subscribe('change', function (date) {
      console.debug(date);
    });

  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.provinces.length === 0 && this.props.provinces.length > 0) {
      $('#provinces').chosen();
    } else if (prevProps.areaIslandsActive === true && this.props.areaIslandsActive === false) {
      $('#islands').chosen('destroy');
      $('#provinces').chosen();
    } else if (prevProps.areaIslandsActive === false && this.props.areaIslandsActive === true) {
      $('#provinces').chosen('destroy');
      $('#islands').chosen();
    }
  }

  render () {
    let className = 'text-center';
    if (this.props.activeTab !== analysisPanelText.analysisTabId) { className += ' hidden'; }
    return (
      <div className={className}>
        <p>{analysisPanelText.analysisAreaHeader}</p>
        <div className='flex flex-justify-around'>
          <label>
            <input onChange={analysisActions.toggleAreaIslandsActive} checked={this.props.areaIslandsActive} type='radio' />
            {' By Island(s)'}
          </label>
          <label>
            <input onChange={analysisActions.toggleAreaIslandsActive} checked={!this.props.areaIslandsActive} type='radio' />
            {' By Province(s)'}
          </label>
        </div>
        <div className='padding'>
        {this.props.islands.length > 0 ?
          <select multiple id='islands' className={`chosen-select-no-single fill__wide ${this.props.areaIslandsActive === true ? '' : 'hidden'}`} onChange={this.change} disabled={this.props.islands.length === 0}>
            {this.props.islands.map((i) => (
              <option value={i}>{i}</option>
            ))}
          </select>
          : null
        }
        {this.props.islands.length > 0 ?
          <select multiple id='provinces' className={`chosen-select-no-single fill__wide ${this.props.areaIslandsActive === false ? '' : 'hidden'}`} onChange={this.change}>
            {this.props.provinces.map((p) => (
              <option value={p}>{p}</option>
            ))}
          </select>
          : null
        }
        </div>
        <p>{analysisPanelText.analysisTimeframeHeader}</p>
        <AnalysisComponent {...this.state} options={analysisPanelText.analysisCalendar} />
        <div className='no-shrink analysis-footer text-center'>
          <button onClick={this.beginAnalysis.bind(this)} className='gfw-btn blue'>{analysisPanelText.analysisButtonLabel}</button>
        </div>
      </div>
    );
  }

  beginAnalysis () {
    app.debug('AnalysisTab >>> beginAnalysis');
    let provinces;
    let aoiType;


    let reportdateFrom = this.state.analysisStartDate.split('/');
    let reportdateTo = this.state.analysisEndDate.split('/');

    let reportdates = {};

    reportdates.fYear = Number(reportdateFrom[2]);
    reportdates.fMonth = Number(reportdateFrom[0]);
    reportdates.fDay = Number(reportdateFrom[1]);
    reportdates.tYear = Number(reportdateTo[2]);
    reportdates.tMonth = Number(reportdateTo[0]);
    reportdates.tDay = Number(reportdateTo[1]);

    // window.open with the proper url and proper hash
    // report/#aoitype=ISLAND&dates=fYear-2016!fMonth-2!fDay-24!tYear-2016!tMonth-3!tDay-2&aois=Java!Kalimantan!Lesser Sunda

    if (this.props.areaIslandsActive) {
      provinces = $('#islands').chosen().val();
      aoiType = 'ISLAND';
    } else {
      provinces = $('#provinces').chosen().val();
      aoiType = 'PROVINCE';
    }

    let hash = this.reportDataToHash(aoiType, reportdates, provinces);
    let win = window.open('../report/index.html' + hash, '_blank', '');

    win.report = true;
    win.reportOptions = {
      'dates': reportdates,
      'aois': provinces,
      'aoitype': aoiType
    };
  }

  reportDataToHash (aoitype, dates, aois) {
    let hash = '#',
      dateargs = [],
      datestring,
      aoistring;


    for (let val in dates) {
      if (dates.hasOwnProperty(val)) {
        dateargs.push([val, dates[val]].join('-'));
      }
    }

    datestring = 'dates=' + dateargs.join('!');

    aoistring = 'aois=' + aois.join('!');

    hash += ['aoitype=' + aoitype, datestring, aoistring].join('&');

    return hash;
  }

}
