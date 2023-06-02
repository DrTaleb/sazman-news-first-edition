import React, {Component} from "react";
import Chart from "react-apexcharts";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'لایک ها',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            }, {
                name: 'بازدید ها',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }, {
                name: 'کامنت ها',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['پست ۱', 'پست ۲', 'پست ۳', 'پست ۴', 'پست ۵', 'پست ۶', 'پست ۷', 'پست ۸', 'پست ۹'],
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "" + val + " نفر"
                        }
                    }
                },
                fontFamily: "YekanBakh"


            },


        };
    }

    render() {
        return (

            <div id="chart">
                <Chart options={this.state.options}
                       series={this.state.series}
                       type="bar"
                       height={350}
                />
            </div>
        );
    }
}

export default App;