import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@material-ui/core';

import leadsPerMonth from 'src/utils/leadsPerMonth';
import datesFormat2 from 'src/utils/datesFormat2';
import datesFormat from 'src/utils/datesFormat';
import salesPerMonth2 from 'src/utils/leadsSoldPerMonth2';
import _ from 'lodash'
import '../styles.css'
import generateColor from 'src/utils/createColorsGradient';


import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const LineChart = ({ leads, type, ids, idsS}) => {
  const theme = useTheme();

  let fix = [];
  let fix2 = [];

  let arrMakes;
  let arrMakes2;
  let categories;
  let makesLeads;
  let categories2;
  let salesMonth;
  
  fix.push(...ids);
  fix2.push(...idsS);
  let colores = generateColor('#ffffff', theme.palette.primary.main, 12)

  //1 all
  //0 unique

    arrMakes = datesFormat(leads, 'H');
    arrMakes2 = datesFormat2(leads, 'H');

    categories = _.uniqBy(arrMakes);
    categories2 = _.uniqBy(arrMakes2);
    
    makesLeads = leadsPerMonth(leads, categories, 'H');

    salesMonth = salesPerMonth2(leads, categories, 'H');

    let cakeLabels = [];
    categories.map( (item, i ) => {
      cakeLabels.push({
        name: item+':00',
        y: makesLeads[i]
      })
      return false;
    })

    let finalSerie = [];

    makesLeads.map( (item, i) =>{
      finalSerie.push({
        y: item,
        color: theme.palette.primary.main
      })
      return false;
    });

    let finalSerie2 = [];

    salesMonth.map( (item, i) =>{
      finalSerie2.push({
        y: item,
        color: '#ff5c7c'
      })
      return false
    });

  // const categories = datesFormat(leads, filter);

  // const leadsMonth = leadsPerMonth(leads, categories, filter);

  let options;
  if(type === 'column'){
    options = {
      chart: {
      type: 'column',
      backgroundColor: theme.palette.background.paper,
      style: {
        color: theme.palette.divider
      }
    },
    legend: {
      itemStyle: {
          color: theme.palette.text.primary,
      }
    },
    tooltip: {
      enabled: true
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        color: theme.palette.primary.main,
      },
      series: {
        dataLabels: { 
          enabled: true, 
          inside: false,
          overflow: 'none',
          crop: true,
          color: 'rgba(255,255,255,1)',
          y: -10,
          style: {
            fontFamily: 'Helvetica, sans-serif',
            fontSize: '12px',
            fontWeight: 'normal',
            textShadow: 'none',

          },
          formatter: function() {
            return Highcharts.numberFormat(this.y,0);
          }
        }
      }
    },
    title: {
      text: '',
      style: {
        color: theme.palette.divider
      }
    },
    xAxis: {
      categories: categories2,
      lineColor: theme.palette.divider,
      labels: {
         style: {
            color: theme.palette.text.primary,
         }
      },
    },
    yAxis: [
      {
        title: {
          text: '',
          style: {
            color: theme.palette.text.primary
          },
        },
        labels: {
          style: {
            color: theme.palette.text.primary,
          }
        },
        gridLineColor: theme.palette.divider,
        lineColor: theme.palette.divider,
        lineWidth: 1
      },
      {
        title: {
          text: '',
          style: {
            color: theme.palette.text.primary
          },
        },
        labels: {
          style: {
            color: theme.palette.text.primary,
          }
        },
        opposite: true,
        lineColor: theme.palette.divider,
        lineWidth: 1
      }
    ],
    series: [
      {
        name: 'Leads',
        data: finalSerie,
        color: theme.palette.primary.main
      }
    ]
  };
  }else{
    options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
          borderWidth: 0,
            allowPointSelect: true,
            cursor: 'pointer',
            colors: colores,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.2f} %'
            }
        }
    },
    series: [{
        name: 'Leads',
        colorByPoint: true,
        data: cakeLabels
    }]
    }
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Leads
        </Typography>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </CardContent>
    </Card>
  );
};

export default LineChart;
