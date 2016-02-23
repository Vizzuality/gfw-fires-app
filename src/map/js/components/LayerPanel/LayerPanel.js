import WaterStressLegend from 'components/LayerPanel/WaterStressLegend';
import LandCoverLegend from 'components/LayerPanel/LandCoverLegend';
import SedimentLegend from 'components/LayerPanel/SedimentLegend';
import DensityDisplay from 'components/LayerPanel/DensityDisplay';
import LayerCheckbox from 'components/LayerPanel/LayerCheckbox';
import FiresControls from 'components/LayerPanel/FiresControls';
import LossControls from 'components/LayerPanel/LossControls';
import RiskCalendar from 'components/LayerPanel/RiskCalendar';
import ImageryComponent from 'components/LayerPanel/ImageryComponent';
import LayerGroup from 'components/LayerPanel/LayerGroup';
import DamsLegend from 'components/LayerPanel/DamsLegend';
import {layersConfig, layerPanelText, controlPanelText} from 'js/config';
import {mapStore} from 'stores/MapStore';
import {mapActions} from 'actions/MapActions';
import KEYS from 'js/constants';
import React from 'react';

export default class LayerPanel extends React.Component {

  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    this.state = mapStore.getState();
  }

  storeUpdated () {
    this.setState(mapStore.getState());
  }

  clickedBasemap (id) {
    mapActions.setBasemap(id);
  }

  checkboxMap (group) {
    return layer => {
      let activeLayers = this.state.activeLayers;
      // Exclude Layers not part of this group
      if (layer.group !== group) { return null; }
      // TODO: Remove once current layer panel design is approved
      // If it is just a label, render the grop label
      // if (layer.isGroupLabel) { return <div key={layer.id} className='layer-group-label'>{layer.label}</div>; }

      // Some layers have legends or tools and they should be rendered inside the layer checkbox
      let childComponent;
      switch (layer.id) {
        case KEYS.waterStress:
          childComponent = <WaterStressLegend url={layer.url} layerIds={layer.layerIds} />;
          break;
        case KEYS.sediment:
          childComponent = <SedimentLegend url={layer.url} layerIds={layer.layerIds} />;
          break;
        case KEYS.majorDams:
          childComponent = <DamsLegend url={layer.url} layerIds={layer.layerIds} />;
          break;
        case KEYS.activeFires:
          childComponent = <FiresControls loaded={this.props.loaded} {...this.state} />;
          break;
        case KEYS.loss:
          childComponent = <LossControls loaded={this.props.loaded} {...this.state} />;
          break;
        case KEYS.treeCoverDensity:
          childComponent = <DensityDisplay {...this.state} />;
          break;
        case KEYS.peatlands:
          childComponent = <LandCoverLegend url={layer.url} layerIds={layer.layerIds} />;
          break;
        case KEYS.fireRisk:
          childComponent = <RiskCalendar domId={layer.calendar.domId} domClass={layer.calendar.domClass} childDomClass={layer.calendar.childDomClass} startDate={layer.calendar.startDate} currentDate={layer.calendar.currentDate} />;
          break;
        case KEYS.windDirection:
          childComponent = <RiskCalendar domId={layer.calendar.domId} domClass={layer.calendar.domClass} childDomClass={layer.calendar.childDomClass} startDate={layer.calendar.startDate} currentDate={layer.calendar.currentDate} />;
          break;
        case KEYS.digitalGlobe:
          childComponent = <ImageryComponent {...this.state} domId={layer.calendar.domId} domClass={layer.calendar.domClass} childDomClass={layer.calendar.childDomClass} startDate={layer.calendar.startDate} currentDate={layer.calendar.currentDate} />;
          break;
        default:
          childComponent = null;
      }

      return (
        <LayerCheckbox key={layer.id} layer={layer} checked={activeLayers.indexOf(layer.id) > -1}>
          {childComponent}
        </LayerCheckbox>
      );
    };
  }

  render() {
    let className = 'layer-panel map-component custom-scroll shadow';
    let landUseLayers = layersConfig.filter((l) => l.group === 'forestUse').map(this.checkboxMap('forestUse'), this);
    if (app.mobile() === true && this.state.layerPanelVisible === false) { className += ' hidden'; }

    return (
      <div className={className}>
        <LayerGroup activeLayers={this.state.activeLayers} label='Fires'>
          {layersConfig.map(this.checkboxMap('fires'), this)}
        </LayerGroup>
        <LayerGroup activeLayers={this.state.activeLayers} label='Land use'>
          {landUseLayers[0]}
          {layerPanelText.concessions}
          {landUseLayers[1]}
          {landUseLayers[2]}
          {landUseLayers[3]}
          {landUseLayers[4]}
        </LayerGroup>
        <LayerGroup activeLayers={this.state.activeLayers} label='Conservation'>
          {layersConfig.map(this.checkboxMap('conservation'), this)}
        </LayerGroup>
        <LayerGroup activeLayers={this.state.activeLayers} label='Land Cover'>
          {layersConfig.map(this.checkboxMap('landCover'), this)}
        </LayerGroup>
        <LayerGroup activeLayers={this.state.activeLayers} label='Air Quality'>
          {layersConfig.map(this.checkboxMap('airQuality'), this)}
        </LayerGroup>
        <LayerGroup activeLayers={this.state.activeLayers} label='Imagery'>
          {layersConfig.map(this.checkboxMap('imagery'), this)}
        </LayerGroup>
        <LayerGroup activeLayers={this.state.activeLayers} label='Stories'>
          {layersConfig.map(this.checkboxMap('stories'), this)}
        </LayerGroup>

        <div className='mobile-show'>
          <div className='layer-category'>
            <div className='layer-category-label pointer'>
              Basemaps
            </div>
            <div>
              <div className='flex flex-wrap flex-justify-between padding'>
                <div className='basemap-item pointer' onClick={this.clickedBasemap.bind(this, KEYS.darkGrayBasemap)}>
                  <div className={`basemap-thumbnail dark-gray-basemap ${this.state.activeBasemap === KEYS.darkGrayBasemap ? 'active' : ''}`} />
                  <div className='basemap-label'>{controlPanelText.darkGrayBasemap}</div>
                </div>
                <div className='basemap-item pointer' onClick={this.clickedBasemap.bind(this, KEYS.topoBasemap)}>
                  <div className={`basemap-thumbnail topo-basemap ${this.state.activeBasemap === KEYS.topoBasemap ? 'active' : ''}`} />
                  <div className='basemap-label'>{controlPanelText.topoBasemap}</div>
                </div>
                <div className='basemap-item pointer' onClick={this.clickedBasemap.bind(this, KEYS.wriBasemap)}>
                  <div className={`basemap-thumbnail wri-basemap ${this.state.activeBasemap === KEYS.wriBasemap ? 'active' : ''}`} />
                  <div className='basemap-label'>{controlPanelText.wriBasemap}</div>
                </div>
                <div className='basemap-item pointer' onClick={this.clickedBasemap.bind(this, KEYS.imageryBasemap)}>
                  <div className={`basemap-thumbnail imagery-basemap ${this.state.activeBasemap === KEYS.imageryBasemap ? 'active' : ''}`} />
                  <div className='basemap-label'>{controlPanelText.imageryBasemap}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

}