
import ReactECharts  from 'echarts-for-react';


// Propiedades(parámetros de entrada)

//     x: las coordenadas x
//     y: las coordenadas y
//     height: la altura de la gráfica
//     width: el ancho de la gráfica


export default function LineChart({ x ,  y ,  height,width} ) {


  const option = {
    title: {
      text: 'Stream en tiempo real',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
        data: x ,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
            data: y ,
        type: 'line',
        showSymbol: false,
        smooth: true,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: height, width: width}} />;
}