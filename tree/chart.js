/**
 * Created by Carlos on 27/01/2016.
 */
            var chartObject;

            function loadData(newDataId){
                console.info("loading data");
                chartObject.data.shown(["data1","data2","data3"]);
            }

            /**
             * Define c3 line chart for license usage information
             * @param bindToSelector
             * @param data
             * @returns {{bindto: *, data: {x: *, columns: Array, xFormat: string}, axis: {y: {label: string, padding: {top: number, bottom: number}, tick: {format: Function}}, x: {type: string, tick: {format: string}, padding: {left: number, right: number}}}}}
             */
            function getC3LicenseUsageChart(bindToSelector, data, maxResults){
                //var _NEWLINE = "&#xA;"
                var xAxisName = data.xAxisName;
                var xFormat = data.xFormat;
                var columnsArray = [];

                /*build an array of arrays containing the xAxis labels and the actual data*/
                for(var key in data.licenses){
                    columnsArray.push(data.licenses[key]);
                    if(columnsArray.length > maxResults){
                        //we need to count one more time since first array in columnsArray is always xAxis values
                        break;
                    }
                }

                /*Object that represents structure and properties of the c3 chart*/
                chartObject = {
                    bindto: bindToSelector,
                    legend: {
                        show: true,
                        position: 'right',
                        inset: {
                            anchor: 'top-right',
                            x: 20,
                            y: 10,
                            step: data.licenses.length
                        }
                    },
                    data: {
                        type: 'area-spline', //TODO check if its ok with UX (spline not line)
                        x: xAxisName,
                        columns: columnsArray,
                        names: { //TODO load /reload dynamically
                          data1: "queriesLimit",
                          data2: "spaceLimitGB",
                          data3: "expressStorage"
                        },
                        classes: { //access via c3-target-main-data
                            data1: "main-data",
                            data2: "second-data",
                            data3: "third-data"
                        },
                        colors: { //TODO move to CSS?
                            data1: "#01a982",
                            data2: "#614767",
                            data3: "#ff8d6d"
                        },
                        shown: ["data1","data2","data3"],
                        xFormat: "%Y-%m" //this tells the chart how to interpret the x axis data
                    },
                    point: {
                        show: true,
                        r: 5,
                        focus: {
                            expand: {
                                enabled: true,
                                r: 5
                            }
                        }

                    },
                    axis: {
                        y: {
                            label:{
                                text: 'License Usage %',
                                position: 'outer-middle'
                            },
                            padding: {
                                top: 60,
                                bottom: 1
                            },
                            tick: {
                                format: function(y){
                                    return y+'%';
                                }
                            }
                        },
                        x: {
                            type: 'timeseries',
                            tick: {
                                max: 0,
                                format: '%b-%Y' //this tells the chart how to display the x axis data
                            },
                            padding:{
                                left: 0,
                                right: 0
                            }
                        }
                    },
                    transition: {
                        duration: 1000
                    }
                }

                return chartObject;
            }

            /***
             * Building data structure for graph to display
             */
  /*          var endDate = new Date();
            var endYM = endDate.getFullYear()+"-"+(endDate.getMonth()+1);
            //Take a year from now
            var startDate = new Date(endDate.getFullYear()-1, (endDate.getMonth()+1), 1);
            var startYM = startDate.getFullYear()+"-"+(startDate.getMonth());
*/
            /*Request license usage data*/
/*            getDashboardLicenseUsage($stateParams.productId, startYM, endYM){}
                .then(function (data) {
                    //TODO the selector of the hosting element should be passed dynamically

                    //the actual generation and placemenet of the chart inside DOM element
                    c3.generate(getC3LicenseUsageChart('#solutionLicenseUsageChart', data.data, 3));
                }
            );*/





