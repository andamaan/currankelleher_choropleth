import { select, scaleOrdinal, schemeSpectral} from 'd3';

import {loadAndProcessData} from './loadAndProcessData.js'
import {colorLegend} from './colorLegend.js'
import {chloroplethMap} from './chloroplethMap.js'

const svg = select('svg');
const chloroplethMapG = svg.append('g')
const colorLegendG = svg.append('g')
    .attr('transform', 'translate(60,350)')

const colorScale = scaleOrdinal()
const colorValue = d => d.properties.economy

let selectedColorValue 
let features

const onClick = (d) => {
    selectedColorValue = d
    render()
}

loadAndProcessData().then(countries => {
    features = countries.features
    render()
})

const render = () => {
    
    colorScale
        .domain(features.map(colorValue))
        .domain(colorScale.domain().sort().reverse())
        .range(schemeSpectral[colorScale.domain().length])

    colorLegendG.call(colorLegend, {
        colorScale,
        circleRadius: 7,
        spacing: 20,
        textOffset: 30,
        onClick,
        selectedColorValue
    })

    chloroplethMapG.call(chloroplethMap, {
        features,
        colorScale,
        colorValue,
        selectedColorValue
    })
}







