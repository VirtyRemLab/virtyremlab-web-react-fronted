
import ReactECharts  from 'echarts-for-react';


// Propiedades(parámetros de entrada)

//     x: las coordenadas x
//     y: las coordenadas y
//     height: la altura de la gráfica
//     width: el ancho de la gráfica


export default function LineChart({ title, x ,  y ,  height,width} ) {


  const option = {
    title: {
      text: title,
      textStyle: {
        color: '#ffffff', // color del título
        fontSize: 20,
        fontWeight: 'bold',
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      top: 60,
      bottom: 60,
      containLabel: true,
      backgroundColor: '#000000', // ⚙️ solo visible si usas un tema custom
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