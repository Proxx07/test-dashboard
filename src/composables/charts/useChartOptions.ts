import {computed} from "vue";
import {IChartConfigProps, IChartProps} from "@/composables/charts/types.ts";
import {seriesType} from "@/models/interfaces/chartTypes.ts";


export const useChartOptions = (props: IChartProps & IChartConfigProps) => {
  const colors = props.colors ?? ['rgba(0, 137, 188, 1)', 'rgba(217, 23, 23, 1)', 'rgba(255, 245, 0, 1)', 'rgba(118, 74, 230, 1)', 'rgba(23, 217, 90, 1)', 'rgba(141, 141, 141, 1)'];

  const renderTooltip = (selectedIndex: number, series: seriesType[], labels: string[], colorsArr = colors) => {
    const currentItem = {
      names: series.map(i => i.name),
      series: series.map(s => Array.isArray(s.data) ? [...s.data].filter((_, index) => index === selectedIndex)[0] : s.data)
    }
    return `
      <div class='apex-tooltip'>
        <div class="apex-tooltip__list" style="--count: ${currentItem.names.length}">
          ${currentItem.names
          .map((name, index) => `
             <div class="apex-tooltip__item">
              <div class="apex-tooltip__title"> ${currentItem.series[index]} </div>
              <div class="apex-tooltip__name ${!name && 'hide'}">
                <span class="marker" style="--marker-color: ${colorsArr[index % colorsArr.length]}"></span>
                ${name}
              </div>
             </div>
          `).join('')}
        </div>
        <div class="apex-tooltip__label"> ${labels[selectedIndex]} </div>
      </div>`
  }

  // const disableSiblings = (seriesElements: HTMLElement[], selectedIndex: number) => {
  //
  // }

  const chartOptions = computed(() => {
    return {
      ...(props.categories && {labels: props.categories}),
      colors: colors,
      theme: {mode: "dark"},
      chart: {
        type: props.type,
        stacked: true,
        zoom: {enabled: false},
        toolbar: {show: false},
        offsetY: props.type === 'donut' && props.direction === 'row' ? 20 : 10,
      },
      plotOptions: {
        bar: {
          horizontal: props.type === 'bar' && props.horizontal,
          borderRadius: 4,
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'last',
          columnWidth: props.patterned ? '100%' : "70%",
        },

        ...(props.pie && {
          pie: {
            startAngle: -props.pie,
            endAngle: props.pie,
            offsetY: 90,
            customScale: 1.51
          }
        })
      },
      grid: {
        show: !props.hideAxises,
        borderColor: "rgba(255, 255, 255, 0.5)",
      },

      stroke: {
        width: props.type === 'area' ? 2 : 0,
        curve: props.type === 'area' && 'straight'
      },

      ...(props.patterned && {
        fill: {
          type: "pattern",
          opacity: 1,
          pattern: {
            width: 10,
            strokeWidth: 8,
            height: 1,
            style: ['verticalLines', 'verticalLines']
          }
        },
      }),
      ...(props.type === 'area' && {
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.2,
            opacityTo: 0.2,
          }
        },
      }),

      dataLabels: {enabled: false},
      legend: {show: false},
      xaxis: {
        axisBorder: {show: false},
        axisTicks: {show: false},
        max: props.patterned && props.series.length === 2 && (props.series as seriesType[]).reduce((acc: number[], {data}) => acc.concat(data), []).reduce((acc, curr) => acc+= curr),
        crosshairs: {
          show: !props.hideAxises
        },
        labels: {
          show: !props.hideAxises,
          style: {
            cssClass: "chart-axis-labels",
            fontFamily: "unset",
          }
        }
      },
      yaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          show: !props.hideAxises,
          style: {
            cssClass: "chart-axis-labels",
            fontFamily: "unset",
          }
        }
      },
      tooltip: {
        ...(props.type !== 'donut' && {
          custom: ({dataPointIndex, ctx}: any) => {
            return renderTooltip(dataPointIndex, ctx.opts.series, ctx.opts.labels)
          },
        })
      }
    }
  });

  return {
    chartOptions
  }
}