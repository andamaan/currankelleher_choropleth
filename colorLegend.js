export const colorLegend = (selection, props) => {
    const {
      colorScale,
      circleRadius,
      spacing,
      textOffset,
      onClick,
      selectedColorValue
    } = props;
  
    const backgroundRect = selection.selectAll('rect')
      .data([null])
    backgroundRect.enter().append('rect')
      .merge(backgroundRect)
        .attr('id', 'legendBox')
        .attr('x', -25)
        .attr('y', -25)
        .attr('width', 250)
        .attr('height', 170)
        .attr('rx', circleRadius)
        .attr('fill', 'white')


    const groups = selection.selectAll('.tick')
      .data(colorScale.domain());
    const groupsEnter = groups
      .enter().append('g')
        .attr('class', 'tick');
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) =>
          `translate(0, ${i * spacing})`
        )
        .attr('opacity', d => 
        (!selectedColorValue || d === selectedColorValue)
          ? 1
          : 0.2
          )
        .on('click', d => onClick(
          d === selectedColorValue
            ? null
            : d
        ))
    groups.exit().remove();
  
    groupsEnter.append('circle')
      .merge(groups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScale);
  
    groupsEnter.append('text')
      .merge(groups.select('text'))
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', textOffset);
  }