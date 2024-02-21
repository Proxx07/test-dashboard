import {computed} from "vue";
//import {formatters} from "@/utils/scripts.ts";
import {IChartConfigProps} from "@/hooks/charts/types.ts";
import {seriesType} from "@/models/interfaces/chartTypes.ts";


export const useChartOptions = (props: IChartConfigProps) => {
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
              <div class="apex-tooltip__name">
                <span class="marker" style="--marker-color: ${colorsArr[index % colorsArr.length]}"></span>
                ${name}
              </div>
             </div>
          `).join('')}
        </div>
        <div class="apex-tooltip__label"> ${labels[selectedIndex]} </div>
      </div>`
  }

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
        },
      },
      grid: {
        borderColor: "rgba(255, 255, 255, 0.5)",
      },

      stroke: {width: 0},
      dataLabels: {enabled: false},
      legend: {show: false},

      xaxis: {
        axisBorder: {show: false},
        axisTicks: {show: false},
        labels: {
          style: {
            cssClass: "chart-axis-labels",
            fontFamily: "unset",
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            cssClass: "chart-axis-labels",
            fontFamily: "unset",
          }
        }
      },
      tooltip: {
        ...(props.type === 'bar' && {
          custom: ({dataPointIndex, ctx}: any) => {
            return renderTooltip(dataPointIndex, ctx.opts.series, ctx.opts.labels)
          },
        })

        /*
        x: {
          formatter: props.formatterX && formatters[props.formatterX],
        }
        y: {
          formatter: props.formatterY && formatters[props.formatterY],
        }
        */
      }
    }
  });

  return {
    chartOptions
  }
}