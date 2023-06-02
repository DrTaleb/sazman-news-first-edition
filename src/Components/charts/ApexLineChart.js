import React, { Component } from "react";
import Chart from "react-apexcharts";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: ["پست ۱", "پست ۲", "پست ۳", "پست ۴", "پست ۵", "پست ۶", "پست ۷", "پست ۸"]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        };
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            className={"col-12"}
                            height={400}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;